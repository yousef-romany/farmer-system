import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatNumber } from "@/lib/utils"
import { ArrowLeft, Printer } from "lucide-react"
import { LineChart } from "@/components/charts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function LivestockDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

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
          <h1 className="mr-4 text-xl font-bold">تفاصيل الماشية #{id}</h1>
          <div className="ml-auto">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              طباعة
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>معلومات أساسية</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">الرقم التعريفي</dt>
                    <dd className="text-lg font-semibold">#{id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">السلالة</dt>
                    <dd className="text-lg font-semibold">هولشتاين</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">العمر</dt>
                    <dd className="text-lg font-semibold">{formatNumber(18)} شهر</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">الوزن الحالي</dt>
                    <dd className="text-lg font-semibold">{formatNumber(450)} كجم</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">العنبر</dt>
                    <dd className="text-lg font-semibold">عنبر 1</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">تاريخ الإضافة</dt>
                    <dd className="text-lg font-semibold">{formatDate(new Date().toISOString())}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">الحالة</dt>
                    <dd>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                        نشط
                      </span>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>سجل الأوزان</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="h-[300px]" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="weights" className="mt-6">
            <TabsList>
              <TabsTrigger value="weights">سجل الأوزان</TabsTrigger>
              <TabsTrigger value="medications">سجل الأدوية</TabsTrigger>
              <TabsTrigger value="notes">ملاحظات</TabsTrigger>
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
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوزن (كجم)</TableHead>
                        <TableHead>التغيير</TableHead>
                        <TableHead>ملاحظات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {formatDate(new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString())}
                          </TableCell>
                          <TableCell>{formatNumber(450 - i * 10)}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                i === 0
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              }`}
                            >
                              {i === 0 ? "+10 كجم" : "+10 كجم"}
                            </span>
                          </TableCell>
                          <TableCell>{i === 0 ? "زيادة جيدة في الوزن" : "زيادة طبيعية"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>سجل الأدوية</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>اسم الدواء</TableHead>
                        <TableHead>الجرعة</TableHead>
                        <TableHead>السبب</TableHead>
                        <TableHead>المسؤول</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {formatDate(new Date(Date.now() - i * 15 * 24 * 60 * 60 * 1000).toISOString())}
                          </TableCell>
                          <TableCell>{["مضاد حيوي", "فيتامينات", "لقاح"][i]}</TableCell>
                          <TableCell>
                            {formatNumber(i + 1)} {i === 0 ? "حقنة" : "جرعة"}
                          </TableCell>
                          <TableCell>{["علاج التهاب", "تحسين الصحة العامة", "وقاية"][i]}</TableCell>
                          <TableCell>د. أحمد محمد</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

