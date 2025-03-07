import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { Download, FileText, Printer, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-xl font-bold">التقارير</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Input type="search" placeholder="بحث..." className="w-64 pl-8" />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">تقارير المواشي</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-2xl font-bold">{formatNumber(5)}</div>
                <p className="text-xs text-muted-foreground">تقارير متاحة</p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  عرض التقارير
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">تقارير الأوزان</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-2xl font-bold">{formatNumber(3)}</div>
                <p className="text-xs text-muted-foreground">تقارير متاحة</p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  عرض التقارير
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">تقارير المصروفات</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-2xl font-bold">{formatNumber(4)}</div>
                <p className="text-xs text-muted-foreground">تقارير متاحة</p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  عرض التقارير
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">تقارير الأداء</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-2xl font-bold">{formatNumber(2)}</div>
                <p className="text-xs text-muted-foreground">تقارير متاحة</p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  عرض التقارير
                </Button>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="livestock">
            <TabsList>
              <TabsTrigger value="livestock">تقارير المواشي</TabsTrigger>
              <TabsTrigger value="weights">تقارير الأوزان</TabsTrigger>
              <TabsTrigger value="expenses">تقارير المصروفات</TabsTrigger>
              <TabsTrigger value="performance">تقارير الأداء</TabsTrigger>
            </TabsList>
            <TabsContent value="livestock">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distribution">توزيع المواشي</SelectItem>
                      <SelectItem value="growth">معدل النمو</SelectItem>
                      <SelectItem value="health">الحالة الصحية</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="الفترة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">شهري</SelectItem>
                      <SelectItem value="quarter">ربع سنوي</SelectItem>
                      <SelectItem value="year">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع المواشي حسب السلالة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChart className="h-full" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع المواشي حسب العمر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChart className="h-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>ملخص بيانات المواشي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">إجمالي المواشي</h3>
                      <p className="text-2xl font-bold">{formatNumber(120)}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        تم تحديثه في {formatDate(new Date().toISOString())}
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">متوسط العمر</h3>
                      <p className="text-2xl font-bold">{formatNumber(18)} شهر</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        تم تحديثه في {formatDate(new Date().toISOString())}
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">متوسط الوزن</h3>
                      <p className="text-2xl font-bold">{formatNumber(450)} كجم</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        تم تحديثه في {formatDate(new Date().toISOString())}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weights">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">معدل النمو</SelectItem>
                      <SelectItem value="comparison">مقارنة الأوزان</SelectItem>
                      <SelectItem value="trends">اتجاهات الوزن</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="الفترة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">شهري</SelectItem>
                      <SelectItem value="quarter">ربع سنوي</SelectItem>
                      <SelectItem value="year">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>تطور الأوزان</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <LineChart className="h-full" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expenses">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">ملخص المصروفات</SelectItem>
                      <SelectItem value="category">المصروفات حسب الفئة</SelectItem>
                      <SelectItem value="trends">اتجاهات المصروفات</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="الفترة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">شهري</SelectItem>
                      <SelectItem value="quarter">ربع سنوي</SelectItem>
                      <SelectItem value="year">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>المصروفات حسب الفئة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChart className="h-full" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>اتجاهات المصروفات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <LineChart className="h-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>ملخص المصروفات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">إجمالي المصروفات (الشهر الحالي)</h3>
                      <p className="text-2xl font-bold">{formatCurrency(25000)}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        تم تحديثه في {formatDate(new Date().toISOString())}
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">متوسط المصروفات الشهرية</h3>
                      <p className="text-2xl font-bold">{formatCurrency(22000)}</p>
                      <div className="mt-2 text-xs text-muted-foreground">آخر 6 شهور</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">إجمالي المصروفات (السنة الحالية)</h3>
                      <p className="text-2xl font-bold">{formatCurrency(280000)}</p>
                      <div className="mt-2 text-xs text-muted-foreground">حتى تاريخه</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">معدل النمو</SelectItem>
                      <SelectItem value="health">الحالة الصحية</SelectItem>
                      <SelectItem value="efficiency">كفاءة الإنتاج</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="الفترة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">شهري</SelectItem>
                      <SelectItem value="quarter">ربع سنوي</SelectItem>
                      <SelectItem value="year">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">معدل النمو اليومي</h3>
                      <p className="text-2xl font-bold">{formatNumber(0.8)} كجم/يوم</p>
                      <div className="mt-2 text-xs text-muted-foreground">متوسط جميع المواشي</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">معدل استهلاك العلف</h3>
                      <p className="text-2xl font-bold">{formatNumber(12)} كجم/يوم</p>
                      <div className="mt-2 text-xs text-muted-foreground">متوسط لكل ماشية</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">معدل تحويل العلف</h3>
                      <p className="text-2xl font-bold">{formatNumber(6.5)}</p>
                      <div className="mt-2 text-xs text-muted-foreground">كجم علف / كجم وزن</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

