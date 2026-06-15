import { BaseProvider } from "./base"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export class KimiProvider extends BaseProvider {
  constructor() {
    const apiKey = requireEnv("KIMI_API_KEY")
    const baseURL = process.env.KIMI_BASE_URL || "https://api.kimi.com/coding/v1"
    const model = process.env.KIMI_MODEL || "kimi-k2.6"
    super("kimi-for-coding", model, apiKey, baseURL)
  }
}

export class XiaomiProvider extends BaseProvider {
  constructor() {
    const apiKey = requireEnv("XIAOMI_API_KEY")
    const baseURL =
      process.env.XIAOMI_BASE_URL ||
      "https://token-plan-sgp.xiaomimimo.com/v1"
    const model = process.env.XIAOMI_MODEL || "mimo-v2.5"
    super("xiaomi", model, apiKey, baseURL)
  }
}
