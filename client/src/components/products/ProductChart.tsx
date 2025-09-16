import type { Product } from "@/types/product";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ProductChartProps {
  data: Product[];
}

function ProductChart({ data }: ProductChartProps) {
  const monthMap: { [month: string]: number } = {};
  // {["Sep 12"]: 16,["Sep 13"]: 1}

  for (const product of data) {
    const month = new Date(product.createdAt).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
    if (!monthMap[month]) monthMap[month] = 0;
    monthMap[month]++;
  }

  const chartData = Object.entries(monthMap).map(([month, count]) => ({
    month,
    count,
  }));
  // [{month : "Sep 12",count : 1},]

  const chartConfig = {
    date: {
      label: "Date",
      color: "#000000",
    },
    count: {
      label: "Count",
      color: "#000000",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Added per Month</CardTitle>
        <CardDescription>
          See your product instock flow with funcy chart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <XAxis dataKey={"month"} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <Area
              dataKey={"count"}
              type={"linear"}
              fill="#60a5fa"
              stroke="#2563eb"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ProductChart;
