/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ChartProps {
  className?: string;
}

export function LineChart({ className, data }: any) {
  // استخراج الأشهر بالترتيب من البيانات
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];

  // تحويل البيانات إلى قيم يمكن عرضها على المخطط
  const chartData = months.map((month, index) => {
    const monthData = data.filter(
      (item: any) => new Date(item.create_at).getMonth() === index
    );
    const totalWeight = monthData.reduce((sum: number, item: any) => sum + item.weight, 0);
    return totalWeight ? totalWeight / 10 : 0; // تحويل القيم إلى نسبة مئوية
  });
  return (
    <div className={cn("w-full", className)}>
      <div className="h-full w-full rounded-lg bg-gradient-to-b from-primary/20 to-transparent p-4">
        <div className="flex h-full w-full items-end justify-between gap-2">
          {chartData.map((height, i) => (
            <div
              key={i}
              className="relative flex h-full w-full flex-col justify-end"
            >
              <div
                className="relative h-full w-full"
                style={{ height: `${height}%` }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-md bg-primary"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="mt-2 text-center text-xs">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BarChart({
  className,
  data = [],
}: {
  className: any;
  data: any[];
}) {
  const totalExpense = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element?.type === "buy" || element?.type === "expense") {
          return sum + Number(element?.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  const categoryTotals = useMemo(() => {
    return data?.reduce(
      (acc: Record<string, number>, element: any) => {
        if (element?.type === "buy" || element?.type === "expense") {
          acc[element?.category] =
            (acc[element?.category] || 0) + Number(element?.amount);
        }
        return acc;
      },
      { food: 0, drug: 0, animal: 0, setting: 0, else: 0 }
    );
  }, [data]);

  const categories = [
    {
      label: "علف",
      value: (categoryTotals?.food / totalExpense || 0) * 100,
      color: "bg-primary",
    },
    {
      label: "أدوية",
      value: (categoryTotals?.drug / totalExpense || 0) * 100,
      color: "bg-blue-500",
    },
    {
      label: "ماشيه",
      value: (categoryTotals?.animal / totalExpense || 0) * 100,
      color: "bg-pink-500",
    },
    {
      label: "صيانة",
      value: (categoryTotals?.setting / totalExpense || 0) * 100,
      color: "bg-yellow-500",
    },
    {
      label: "أخرى",
      value: (categoryTotals["else"] / totalExpense || 0) * 100,
      color: "bg-red-500",
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="h-full w-full rounded-lg p-4">
        <div className="flex h-full w-full flex-col justify-between gap-8">
          {categories?.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-16 text-sm">{item.label}</span>
              <div className="flex-1 rounded-full bg-muted">
                <div
                  className={`h-4 rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-12 text-sm">
                {Number(item?.value)?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BarChartPlus({
  className,
  data = [],
}: {
  className: any;
  data: any[];
}) {
  const totalExpense = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element?.type === "sale" || element?.type === "deposit") {
          return sum + Number(element?.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  const categoryTotals = useMemo(() => {
    return data?.reduce(
      (acc: Record<string, number>, element: any) => {
        if (element?.type === "sale" || element?.type === "deposit") {
          acc[element?.category] =
            (acc[element?.category] || 0) + Number(element?.amount);
        }
        return acc;
      },
      { food: 0, drug: 0, animal: 0, setting: 0, else: 0 }
    );
  }, [data]);

  const categories = [
    {
      label: "علف",
      value: (categoryTotals?.food / totalExpense || 0) * 100,
      color: "bg-primary",
    },
    {
      label: "أدوية",
      value: (categoryTotals?.drug / totalExpense || 0) * 100,
      color: "bg-blue-500",
    },
    {
      label: "ماشيه",
      value: (categoryTotals?.animal / totalExpense || 0) * 100,
      color: "bg-pink-500",
    },
    {
      label: "صيانة",
      value: (categoryTotals?.setting / totalExpense || 0) * 100,
      color: "bg-yellow-500",
    },
    {
      label: "أخرى",
      value: (categoryTotals["else"] / totalExpense || 0) * 100,
      color: "bg-red-500",
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="h-full w-full rounded-lg p-4">
        <div className="flex h-full w-full flex-col justify-between gap-8">
          {categories?.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-16 text-sm">{item.label}</span>
              <div className="flex-1 rounded-full bg-muted">
                <div
                  className={`h-4 rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-12 text-sm">
                {Number(item?.value)?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PieChart({ className }: ChartProps) {
  // هذا تمثيل بسيط للرسم البياني الدائري
  return (
    <div className={cn("w-full", className)}>
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="relative h-40 w-40">
          <div
            className="absolute inset-0 rounded-full border-8 border-primary"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-0 rounded-full border-8 border-blue-500"
            style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
          />
          <div
            className="absolute inset-0 rounded-full border-8 border-yellow-500"
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-8 border-red-500"
            style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%)" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "هولشتاين", value: "45%", color: "bg-primary" },
            { label: "سيمنتال", value: "25%", color: "bg-blue-500" },
            { label: "جيرسي", value: "20%", color: "bg-yellow-500" },
            { label: "أخرى", value: "10%", color: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${item.color}`} />
              <span className="text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
