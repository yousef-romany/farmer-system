import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { formatNumber } from "@/lib/utils"
import { Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function BarnsPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-xl font-bold">إدارة العنابر</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Input type="search" placeholder="بحث..." className="w-64 pl-8" />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> إضافة عنبر
            </Button>
          </div>
        </div>
        <main className="p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">إجمالي العنابر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(8)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">السعة الإجمالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(200)} ماشية</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">الإشغال الحالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(170)} ماشية</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">نسبة الإشغال</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>قائمة العنابر</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم العنبر</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>السعة</TableHead>
                    <TableHead>الإشغال الحالي</TableHead>
                    <TableHead>نسبة الإشغال</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>عنبر {i + 1}</TableCell>
                      <TableCell>{formatNumber(25)} ماشية</TableCell>
                      <TableCell>{formatNumber(Math.floor(25 * (0.7 + Math.random() * 0.3)))} ماشية</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={Math.floor(70 + Math.random() * 30)} className="h-2" />
                          <span className="text-sm">{Math.floor(70 + Math.random() * 30)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            i % 4 === 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : i % 4 === 1
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : i % 4 === 2
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }`}
                        >
                          {i % 4 === 0 ? "متاح" : i % 4 === 1 ? "شبه ممتلئ" : i % 4 === 2 ? "ممتلئ" : "تحت الصيانة"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

