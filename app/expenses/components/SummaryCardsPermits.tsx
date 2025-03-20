/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/utils";
import { memo, useMemo } from "react";

const SummaryCardsPermits = ({ data }: any) => {
  const totalExpense = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element.type === "buy" || element.type === "expense") {
          return sum + Number(element.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  const totalDeposit = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element.type === "sale" || element.type === "deposit") {
          return sum + Number(element.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  const totalDrug = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element.category === "drug" && element.type === "expense") {
          return sum + Number(element.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  const totalFood = useMemo(() => {
    return (
      data?.reduce((sum: number, element: any) => {
        if (element.category === "food" && element.type === "expense") {
          return sum + Number(element.amount);
        }
        return sum;
      }, 0) || 0
    ); // منع القسمة على صفر
  }, [data]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <ExpenseSummaryCard title="إجمالي المصروفات" amount={totalExpense} />
      <ExpenseSummaryCard title="مصروفات العلف" amount={totalFood} />
      <ExpenseSummaryCard title="مصروفات الأدوية" amount={totalDrug} />
      <ExpenseSummaryCard title="أيرادات" amount={totalDeposit} />
    </div>
  );
};

export default memo(SummaryCardsPermits);

function ExpenseSummaryCard({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: number;
  percentage?: number;
}) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <p className="mt-2 text-2xl font-bold">{formatCurrency(amount)}</p>
      {percentage && (
        <p className="text-xs text-muted-foreground">
          {percentage}% من الإجمالي
        </p>
      )}
    </div>
  );
}
