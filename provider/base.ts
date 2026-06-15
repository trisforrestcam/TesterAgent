import type { ProviderAdapter, ProviderConfig } from "./types"

export abstract class BaseProvider implements ProviderAdapter {
  constructor(
    protected readonly _id: string,
    protected readonly _model: string,
    protected readonly _apiKey: string,
    protected readonly _baseURL: string,
  ) {}

  id(): string {
    return this._id
  }

  model(): string {
    return this._model
  }

  apiKey(): string {
    return this._apiKey
  }

  baseURL(): string {
    return this._baseURL
  }

  toConfig(): ProviderConfig {
    return {
      providerID: this._id,
      modelID: this._model,
      apiKey: this._apiKey,
      baseURL: this._baseURL,
    }
  }

  toOpencodeConfig() {
    return {
      [this._id]: {
        options: {
          apiKey: this._apiKey,
          baseURL: this._baseURL,
        },
        models: {
          [this._model]: {
            name: this._model,
            reasoning: false,
          },
        },
      },
    }
  }
}
