/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo, useMemo } from "react";

const SummaryBarns = ({ data }: any) => {
  const totalLiveStockBusy = useMemo(() => {
    return data?.reduce((sum: number, item: any) => {
      return sum + item.busy_amount;
    }, 0);
  }, [data]);
  const totalLiveStockNotBusy = useMemo(() => {
    return data?.reduce((sum: number, item: any) => {
      return sum + item.capactiy;
    }, 0);
  }, [data]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">إجمالي العنابر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">السعة الإجمالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalLiveStockNotBusy} ماشية
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">الإشغال الحالي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLiveStockBusy} ماشية</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">نسبة الإشغال</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((totalLiveStockBusy / totalLiveStockNotBusy) * 100 || 0).toFixed(
              2
            )}
            %
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default memo(SummaryBarns);
