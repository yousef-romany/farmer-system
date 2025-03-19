"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { ArrowDown, ArrowUp, MilkIcon as Cow, DollarSign, Pill, Scale, Warehouse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { PageLayout } from "@/components/layout/page-layout"

export default function Home() {
  const [globalFilter, setGlobalFilter] = useState("")

  return (
    <PageLayout
      title="لوحة التحكم"
      filter={globalFilter}
      setFilter={setGlobalFilter}
      actions={<Button>إضافة ماشية</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المواشي</CardTitle>
            <Cow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(120)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                {formatNumber(5)}
              </span>{" "}
              منذ الشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إشغال العنابر</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                10%
              </span>{" "}
              منذ الشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">متوسط الوزن</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(450)} كجم</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                {formatNumber(15)} كجم
              </span>{" "}
              منذ الشهر الماضي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(25000)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                {formatCurrency(2000)}
              </span>{" "}
              منذ الشهر الماضي
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>تطور الأوزان</CardTitle>
                <CardDescription>متوسط زيادة الوزن خلال الستة أشهر الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart className="h-[300px]" />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>توزيع المواشي حسب السلالة</CardTitle>
                <CardDescription>نسبة كل سلالة من إجمالي المواشي</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart className="h-[300px]" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>أحدث التحديثات</CardTitle>
                <CardDescription>آخر الإجراءات التي تمت على النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        {i % 3 === 0 ? (
                          <Cow className="h-4 w-4 text-primary" />
                        ) : i % 3 === 1 ? (
                          <Scale className="h-4 w-4 text-primary" />
                        ) : (
                          <Pill className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {i % 3 === 0
                            ? "تمت إضافة ماشية جديدة"
                            : i % 3 === 1
                              ? "تم تحديث وزن الماشية #1234"
                              : "تم إعطاء دواء للماشية #5678"}
                        </p>
                        <p className="text-xs text-muted-foreground">منذ {i} ساعات</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>المصروفات الشهرية</CardTitle>
                <CardDescription>توزيع المصروفات حسب الفئة</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart className="h-[300px]" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>التحليلات</CardTitle>
              <CardDescription>تحليلات مفصلة عن أداء المزرعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">بيانات التحليلات ستظهر هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>التقارير</CardTitle>
              <CardDescription>تقارير مفصلة عن المزرعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">بيانات التقارير ستظهر هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

