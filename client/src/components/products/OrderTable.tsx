import type { Order } from "@/types/order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FAKE_ORDERS } from "@/lib/fakeOrders";
import { Badge } from "../ui/badge";

function OrderTable() {
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
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {FAKE_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
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
