import type { ProviderAdapter } from "./types"
import { KimiProvider, XiaomiProvider } from "./impl"

export type ProviderType = "kimi" | "xiaomi"

const providers: Record<ProviderType, () => ProviderAdapter> = {
  kimi: () => new KimiProvider(),
  xiaomi: () => new XiaomiProvider(),
}

export function getProvider(type?: ProviderType): ProviderAdapter {
  const key = (type || process.env.PROVIDER || "kimi") as ProviderType
  const factory = providers[key]
  if (!factory) {
    throw new Error(`Unknown provider: ${key}. Available: ${Object.keys(providers).join(", ")}`)
  }
  return factory()
}
