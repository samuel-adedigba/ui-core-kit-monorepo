// packages/ui-core-kit/src/components/template/Theme.tsx
import React from 'react'
// import ConfigProvider, { defaultConfig, type Config } from '@/components/ui/ConfigProvider'
import type { CommonProps } from '@/@types/common'
import { ConfigProvider } from '../ui'
import { Config, defaultConfig } from '../ui/ConfigProvider'

export type ThemeProps = CommonProps & {
  config?: Partial<Config>
  locale?: string
}

function isObject(val: any) {
  return val && typeof val === 'object' && !Array.isArray(val)
}

function deepMerge<T extends Record<string, any>>(target: T, source?: Partial<T>): T {
  if (!source) return target
  const out = { ...target } as any
  for (const k of Object.keys(source)) {
    const sv = (source as any)[k]
    const tv = (target as any)[k]
    out[k] = isObject(tv) && isObject(sv) ? deepMerge(tv, sv) : (sv === undefined ? tv : sv)
  }
  return out
}

const Theme: React.FC<ThemeProps> = ({ children, config, locale }) => {
  // Merge default + provided overrides (ensure resulting type is Config)
  const merged = deepMerge<Config>(defaultConfig, {
    ...(config ?? {}),
    ...(locale ? { locale } : {})
  })

  return <ConfigProvider value={merged}>{children}</ConfigProvider>
}

export default Theme
