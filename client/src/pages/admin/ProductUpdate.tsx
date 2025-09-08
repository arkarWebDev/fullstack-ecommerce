import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "@/store/slices/productApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

function ProductUpdate() {
  const { id } = useParams();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetProductDetailQuery(id as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || !id) navigate("/admin");
  }, [isError]);

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("instock_count", String(data.instock_count));
      formData.append("category", data.category);
      formData.append("is_feature", String(data.is_feature));
      formData.append("is_new_arrival", String(data.is_new_arrival));
      formData.append("rating_count", String(data.rating_count));

      // arrays
      data.colors.forEach((c) => formData.append("colors[]", c));
      data.sizes.forEach((s) => formData.append("sizes[]", s));

      // spreate existing images and new images
      const existingImages = data.images.filter(
        (img) => !img.file && img.url && img.public_alt
      );
      const newImages = data.images.filter((img) => img.file);

      formData.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      await updateProduct({ id: id!, formData }).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product");
    }
  };
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Edit product</h1>
      <ProductForm
        onSumbit={onSubmit}
        isLoading={isLoading}
        initialData={initialData}
        isUpdating={isUpdating}
      />
    </section>
  );
}

export default ProductUpdate;
