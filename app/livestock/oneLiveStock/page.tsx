/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { LineChart } from "@/components/charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLiveStockOne } from "@/constant/LiveStock.info";
import { fetchWeightOne } from "@/constant/Weight.info";

export default function LivestockDetailsPage() {
  const [id, setId] = useState<number>(Number(localStorage.getItem("liveStock_id")));
  const [mainData, setMainData] = useState<any>([]);
  const [mainDataWeight, setMainDataWeight] = useState<any>([]);

  useEffect(() => {
    try {
      setId(Number(localStorage.getItem("liveStock_id")));
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleGetMainData = async () => {
    try {
      await setMainData(await fetchLiveStockOne(id));
      await setMainDataWeight(await fetchWeightOne(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const interval = setInterval(() => handleGetMainData(), 1500);
      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/livestock">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">العودة</span>
            </Button>
          </Link>
          <h1 className="mr-4 text-xl font-bold">
            تفاصيل الماشية #{mainData[0]?.idintifer_number}
          </h1>
        </div>
        <main className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1" dir="rtl">
              <CardHeader>
                <CardTitle>معلومات أساسية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      الرقم التعريفي
                    </dt>
                    <dd className="text-lg font-semibold">
                      #{mainData[0]?.idintifer_number}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      السلالة
                    </dt>
                    <dd className="text-lg font-semibold">
                      {mainData[0]?.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      العمر
                    </dt>
                    <dd className="text-lg font-semibold">
                      {mainData[0]?.age} شهر
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      الوزن الحالي
                    </dt>
                    <dd className="text-lg font-semibold">
                      {mainData[0]?.weight} كجم
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      العنبر
                    </dt>
                    <dd className="text-lg font-semibold">
                      عنبر {mainData[0]?.barns_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      تاريخ الإضافة
                    </dt>
                    <dd className="text-lg font-semibold">
                      {mainData[0]?.create_at}
                    </dd>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>سجل الأوزان</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="h-[300px]" data={mainDataWeight} />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="weights" className="mt-6" dir="rtl">
            <TabsList>
              <TabsTrigger value="weights">سجل الأوزان</TabsTrigger>
              {/* <TabsTrigger value="medications">سجل الأدوية</TabsTrigger> */}
              {/* <TabsTrigger value="notes">ملاحظات</TabsTrigger> */}
            </TabsList>
            <TabsContent value="weights" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>سجل الأوزان</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">التاريخ</TableHead>
                        <TableHead className="text-center">
                          الوزن (كجم)
                        </TableHead>
                        <TableHead className="text-center">التغيير</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* mainDataWeight */}
                      {Array.isArray(mainDataWeight) &&
                        mainDataWeight.map((item, key) => (
                          <TableRow key={key}>
                            <TableCell className="text-center">
                              {item.create_at}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.weight}
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  key === 0
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                }`}
                              >
                                {key === 0
                                  ? `${
                                      item.net_weight > 0
                                        ? "+ " + item.net_weight
                                        : "- " + item.net_weight
                                    } كجم`
                                  : `+{10} كجم`}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            {/* <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>سجل الأدوية</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">التاريخ</TableHead>
                        <TableHead className="text-center">اسم الدواء</TableHead>
                        <TableHead className="text-center">الجرعة</TableHead>
                        <TableHead className="text-center">السبب</TableHead>
                        <TableHead className="text-center">المسؤول</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-center">
                            {formatDate(new Date(Date.now() - i * 15 * 24 * 60 * 60 * 1000).toISOString())}
                          </TableCell>
                          <TableCell className="text-center">{["مضاد حيوي", "فيتامينات", "لقاح"][i]}</TableCell>
                          <TableCell className="text-center">
                            {formatNumber(i + 1)} {i === 0 ? "حقنة" : "جرعة"}
                          </TableCell>
                          <TableCell className="text-center">{["علاج التهاب", "تحسين الصحة العامة", "وقاية"][i]}</TableCell>
                          <TableCell className="text-center">د. أحمد محمد</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent> */}
            {/* <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>ملاحظات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">{i === 0 ? "ملاحظة حول الصحة العامة" : "ملاحظة حول التغذية"}</h4>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString())}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 0
                            ? "الماشية بصحة جيدة وتستجيب بشكل جيد للعلاج. يجب متابعة الحالة العامة خلال الأسبوع القادم."
                            : "تم تعديل نظام التغذية لزيادة كمية البروتين. يجب مراقبة تأثير ذلك على الوزن خلال الشهر القادم."}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
