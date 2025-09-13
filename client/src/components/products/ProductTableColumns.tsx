import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDeleteProductMutation } from "@/store/slices/productApi";
import TableHeaderWithSortIcon from "./TableHeaderWithSortIcon";

function useProductColums(): ColumnDef<Product>[] {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const productDeleteHandler = async (id: string, name: string) => {
    if (window.confirm("Are you sure want to delete " + name + "?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success(`${name} deleted successfully`);
      } catch (error) {
        toast.error("Fail to delete product");
      }
    }
  };

  return [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const images = product.images?.slice(0, 2);

        return (
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            {images.map((img) => (
              <Avatar>
                <AvatarImage src={img.url} alt={product.name} />
                <AvatarFallback>
                  {product.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const product = row.original;
        return <div className="font-medium">{product.name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        return (
          <Badge variant={"secondary"} className=" capitalize">
            {getValue() as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return <div className="font-medium">{price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "instock_count",
      header: "Stock",
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <Badge
            className="font-medium"
            variant={
              stock > 10 ? "default" : stock > 0 ? "secondary" : "destructive"
            }
          >
            {stock}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <TableHeaderWithSortIcon
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            text="Created"
          />
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="text-sm text-right">{date.toLocaleDateString()}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <Eye className="mr-1 w-4 h-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
              >
                <Edit className="mr-1 w-4 h-4" />
                Edit product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => productDeleteHandler(product._id, product.name)}
                disabled={isLoading}
              >
                <Trash2 className="mr-1 w-4 h-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export default useProductColums;
