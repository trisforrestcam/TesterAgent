import type { ProviderAdapter } from "./types"
import { KimiProvider, XiaomiProvider } from "./impl"

const providers = {
  kimi: () => new KimiProvider(),
  xiaomi: () => new XiaomiProvider(),
} satisfies Record<string, () => ProviderAdapter>

export type ProviderType = keyof typeof providers

export function getProvider(type?: ProviderType): ProviderAdapter {
  const key = type || (process.env.PROVIDER as ProviderType) || "kimi"
  const factory = providers[key]
  if (!factory) {
    throw new Error(`Unknown provider: ${key}. Available: ${Object.keys(providers).join(", ")}`)
  }
  return factory()
}
