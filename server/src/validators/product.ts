import { body, param } from "express-validator";
import mongoose from "mongoose";

// export const createProductValidator = [
//   body("name").notEmpty().withMessage("Name is required."),
//   body("description").notEmpty().withMessage("Description is required."),
//   body("price").isNumeric().withMessage("Price is required."),
//   body("instock_count").isInt().withMessage("Instock_count must be integer."),
//   body("category").notEmpty().withMessage("Category is require."),
//   body("sizes").isArray({ min: 1 }).withMessage("Sizes must be array."),
//   body("colors").isArray({ min: 1 }).withMessage("Colors must be array."),
//   body("images").isArray({ min: 1 }).withMessage("Images must be array."),
//   body("images.*.file").notEmpty().withMessage("Each image must have file."),
//   body("images.*.preview")
//     .notEmpty()
//     .withMessage("Each image must have preview."),
//   body("is_new_arrival")
//     .isBoolean()
//     .withMessage("is_new_arrival must be boolean."),
//   body("is_feature").isBoolean().withMessage("is_feature must be boolean."),
//   body("rating_count").isInt().withMessage("rating_count must be integer."),
// ];

export const updateProductValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("instock_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock count must be a non-negative integer"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  body("sizes")
    .optional()
    .isArray()
    .withMessage("Sizes must be an array of strings"),
  body("colors")
    .optional()
    .isArray()
    .withMessage("Colors must be an array of strings"),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*.url")
    .optional()
    .isString()
    .withMessage("Each image must have a URL"),
  body("images.*.public_alt")
    .optional()
    .isString()
    .withMessage("Each image must have a public_alt"),
  body("is_new_arrival")
    .optional()
    .isBoolean()
    .withMessage("is_new_arrival must be a boolean"),
  body("is_feature")
    .optional()
    .isBoolean()
    .withMessage("is_feature must be a boolean"),
  body("rating_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Rating count must be a non-negative integer"),
];

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];
