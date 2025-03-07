"use client"

import { cn } from "@/lib/utils"

interface ChartProps {
  className?: string
}

export function LineChart({ className }: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-full w-full rounded-lg bg-gradient-to-b from-primary/20 to-transparent p-4">
        <div className="flex h-full w-full items-end justify-between gap-2">
          {[40, 30, 70, 80, 50, 90].map((height, i) => (
            <div key={i} className="relative flex h-full w-full flex-col justify-end">
              <div className="relative h-full w-full" style={{ height: `${height}%` }}>
                <div className="absolute bottom-0 w-full rounded-md bg-primary" style={{ height: `${height}%` }} />
              </div>
              <span className="mt-2 text-center text-xs">
                {["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BarChart({ className }: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-full w-full rounded-lg p-4">
        <div className="flex h-full w-full flex-col justify-between gap-8">
          {[
            { label: "علف", value: 40, color: "bg-primary" },
            { label: "أدوية", value: 25, color: "bg-blue-500" },
            { label: "صيانة", value: 15, color: "bg-yellow-500" },
            { label: "أخرى", value: 20, color: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-16 text-sm">{item.label}</span>
              <div className="flex-1 rounded-full bg-muted">
                <div className={`h-4 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
              </div>
              <span className="w-12 text-sm">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
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
            style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
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
              <span className="text-xs text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

