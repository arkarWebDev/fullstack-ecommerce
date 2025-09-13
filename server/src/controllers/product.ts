import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Product } from "../models/product";
import { AuthRequest } from "../middlewares/authMiddlewar";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";

// @route POST | api/products
// @desc Add new product
// @access Private/Admin
export const createProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, description, category } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes];
    const colors = Array.isArray(req.body.colors)
      ? req.body.colors
      : [req.body.colors];

    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    const images = req.files as Express.Multer.File[];

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploadImg = await uploadSingleImage(
          `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
          "fash.com/products"
        );
        return {
          url: uploadImg.image_url,
          public_alt: uploadImg.public_alt,
        };
      })
    );

    const newProduct = await Product.create({
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images: uploadedImages,
      is_feature,
      is_new_arrival,
      rating_count,
      userId: req.user?._id,
    });

    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      throw new Error("Something went wrong");
    }
  }
);

// @route PUT | api/products/:id
// @desc Update an existing product.
// @access Private/Admin
export const updateProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, description, category, existingImages } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes];
    const colors = Array.isArray(req.body.colors)
      ? req.body.colors
      : [req.body.colors];

    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    // parse existing images
    const keepExistingImages = existingImages ? JSON.parse(existingImages) : [];

    // new images
    const newImages = req.files as Express.Multer.File[];

    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404);
      throw new Error("No product found with is id.");
    }

    // existing product image from db -> [{url:image_url,public_alt:abcd},{url:image_url,public_alt:efgh}]
    // existing image -> [{url:image_url,public_alt:abcd}]
    // [{url:image_url,public_alt:abcd}] existing images
    // [{url:image_url,public_alt:efgh}] image to delete

    // find images to delete from cloud
    const imagesToDelete = existingProduct.images.filter((existingImg) => {
      return !keepExistingImages.some(
        (keepImg: any) => keepImg.public_alt === existingImg.public_alt
      );
    });

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map(async (img) => {
          if (img.public_alt) {
            try {
              await deleteImage(img.public_alt);
            } catch (err) {
              console.log(`Failed to delete image ${img.public_alt}`, err);
            }
          }
        })
      );
    }

    // upload new images
    let uploadedNewImages: any[] = [];
    if (newImages && newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map(async (image) => {
          const uploadImg = await uploadSingleImage(
            `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
            "fash.com/products"
          );
          return {
            url: uploadImg.image_url,
            public_alt: uploadImg.public_alt,
          };
        })
      );
    }

    const finalImages = [...keepExistingImages, ...uploadedNewImages];

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.instock_count =
      instock_count || existingProduct.instock_count;
    existingProduct.category = category || existingProduct.category;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.colors = colors || existingProduct.colors;
    existingProduct.images = finalImages;
    existingProduct.is_new_arrival =
      is_new_arrival || existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature || existingProduct.is_feature;
    existingProduct.rating_count = rating_count || existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  }
);

// @route DELETE | api/products/:id
// @desc Delete an existing product.
// @access Private/Admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404);
      throw new Error("No product found with is id.");
    }

    const imagesToDeleteWihPublicAltOnly = existingProduct.images.map(
      (img) => img.public_alt
    );

    try {
      await existingProduct.deleteOne();

      if (imagesToDeleteWihPublicAltOnly.length > 0) {
        Promise.all(
          imagesToDeleteWihPublicAltOnly.map(async (alt) => {
            try {
              await deleteImage(alt);
            } catch (error) {
              console.log("Failed to delete image" + alt, error);
            }
          })
        );
      }
      res.status(200).json({ message: "Product destory!" });
    } catch (error) {
      throw new Error("Failed to delete product");
    }
  }
);

// @route GET | api/products
// @desc Get all products with filters.
// @access Public
export const getProductsWithFilters = asyncHandler(async (req, res) => {
  const { keyword, category, minPrice, maxPrice, size, color, sortBy } =
    req.query;

  let query: any = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (color) {
    const colors = Array.isArray(color) ? color : [color];
    query.colors = { $in: colors };
  }

  if (size) {
    const sizes = Array.isArray(size) ? size : [size];
    query.sizes = { $in: sizes };
  }

  // sorting
  let sortOption: any = {};
  if (sortBy === "price_asc") sortOption.price = 1;
  if (sortBy === "price_desc") sortOption.price = -1;
  if (sortBy === "latest") sortOption.createdAt = -1;
  if (sortBy === "rating") sortOption.rating_count = -1;

  const products = await Product.find(query).sort(sortOption);
  res.status(200).json(products);
});

// @route GET | api/products/new
// @desc Get all new products.
// @access Public

export const getNewArrivalsProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ is_new_arrival: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(products);
});

// @route GET | api/products/featured
// @desc Get all featured products.
// @access Public

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ is_feature: true });
  res.status(200).json(products);
});

// @route GET | api/products/:id
// @desc Get product by id.
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found." });
  }
  res.status(200).json(product);
});

// @route GET | api/filters/meta
// @desc Get products meta data.
// @access Public
export const getProductsMeta = asyncHandler(async (req, res) => {
  const colors = await Product.distinct("colors");
  const sizes = await Product.distinct("sizes");

  const priceRange = await Product.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({
    colors,
    sizes,
    minPrice: priceRange[0]?.minPrice || 0,
    maxPrice: priceRange[0]?.maxPrice || 0,
  });
});
