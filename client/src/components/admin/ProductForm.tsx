import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorPicker from "../ColorPicker";
import SizeSelector from "./SizeSelector";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Tiptap from "../editor/TipTap";

interface ProductFormProps {
  initialData?: any;
  onSumbit: (data: ProductFormInputs) => void;
  isLoading: boolean;
  isUpdating?: boolean;
}

function ProductForm({
  initialData,
  onSumbit,
  isLoading,
  isUpdating,
}: ProductFormProps) {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: initialData.price,
          instock_count: initialData.instock_count,
          category: initialData.category,
          sizes: initialData.sizes,
          colors: initialData.colors,
          is_feature: initialData.is_feature,
          is_new_arrival: initialData.is_new_arrival,
          rating_count: initialData.rating_count,
          images: initialData.images.map((img: any) => ({
            url: img.url,
            public_alt: img.public_alt,
          })),
        }
      : {
          name: "",
          description: "",
          price: 0,
          instock_count: 0,
          category: "",
          sizes: [],
          colors: [],
          is_feature: false,
          is_new_arrival: false,
          rating_count: 0,
          images: [],
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        instock_count: initialData.instock_count,
        category: initialData.category,
        sizes: initialData.sizes,
        colors: initialData.colors,
        is_feature: initialData.is_feature,
        is_new_arrival: initialData.is_new_arrival,
        rating_count: initialData.rating_count,
        images: initialData.images.map((img: any) => ({
          url: img.url,
          public_alt: img.public_alt,
        })),
      });
    }
  }, [form, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instock_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instock Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload images={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Caetgory</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <SizeSelector sizes={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <ColorPicker colors={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="is_new_arrival"
            render={({ field }) => (
              <FormItem className="flex items-center rounded-lg border p-4">
                <FormLabel>New Arrival</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_feature"
            render={({ field }) => (
              <FormItem className="flex items-center rounded-lg border p-4">
                <FormLabel>Featured Product</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || isUpdating}
          className="w-full"
        >
          {isUpdating || isLoading
            ? "Saving ..."
            : initialData
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;
