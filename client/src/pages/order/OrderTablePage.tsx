import Loader from "@/components/Loader";
import { useGetOrdersByUserIdQuery } from "@/store/slices/orderApi";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function OrderTablePage() {
  const { data, isLoading } = useGetOrdersByUserIdQuery(undefined);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold my-6">My Orders</h2>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">INV - {order._id}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    order.status === "cancelled" ? "destructive" : "default"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${order.bill}.00</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <Button size={"sm"}>View order items</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Items</DialogTitle>
                    </DialogHeader>
                    <div>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 border-b border-b-gray-300"
                        >
                          <div>
                            <h2 className="font-medium">{item.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div
                                className="w-10 h-4 border-2 border-gray-400 rounded-sm"
                                style={{ backgroundColor: item.color }}
                              />
                              <Badge>{item.size}</Badge>
                            </div>
                          </div>
                          <p className="text-lg font-semibold">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTablePage;
