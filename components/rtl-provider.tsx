"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"

// إنشاء كاش للـ RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
})

const RTLContext = createContext({ isRtl: true })

export function useRTL() {
  return useContext(RTLContext)
}

export function RTLProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.dir = "rtl"
    document.documentElement.setAttribute("dir", "rtl")
  }, [])

  return (
    <RTLContext.Provider value={{ isRtl: true }}>
      <CacheProvider value={cacheRtl}>{children}</CacheProvider>
    </RTLContext.Provider>
  )
}

