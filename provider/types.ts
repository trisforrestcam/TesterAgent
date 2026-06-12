export interface ProviderConfig {
  providerID: string
  modelID: string
  apiKey: string
  baseURL: string
}

export interface ProviderAdapter {
  id(): string
  model(): string
  apiKey(): string
  baseURL(): string
  toConfig(): ProviderConfig
  toOpencodeConfig(): Record<string, unknown>
}
