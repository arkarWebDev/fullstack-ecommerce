import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useGetAllOrdersQuery } from "@/store/slices/orderApi";

function OrderTable() {
  const { data } = useGetAllOrdersQuery(undefined);

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>view your recent order now</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="text-sm w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-2 text-left">Customer email</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr key={order._id}>
                  <td className="p-2">{order.customer}</td>

                  <td className="p-2">
                    <Badge
                      variant={
                        order.status === "cancelled" ? "destructive" : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-2 text-right">${order.bill.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderTable;
