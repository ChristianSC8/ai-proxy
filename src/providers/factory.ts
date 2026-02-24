import { env } from "../config/env.ts"
import { ProviderId } from "../types/provider.ts"
import type { Provider, ProviderConfig } from "../types/provider.ts"
import { OpenAIProvider } from "./openai.ts"

const PROVIDER_CONFIGS: Record<ProviderId, ProviderConfig> = {
  [ProviderId.GitHub]: {
    baseUrl: env.GITHUB_BASE_URL,
    apiKey:  env.GITHUB_TOKEN,
  },
  [ProviderId.Groq]: {
    baseUrl: env.GROQ_BASE_URL,
    apiKey:  env.GROQ_API_KEY,
  },
  [ProviderId.Cerebras]: {
    baseUrl: env.CEREBRAS_BASE_URL,
    apiKey:  env.CEREBRAS_API_KEY,
  },
  [ProviderId.OpenRouter]: {
    baseUrl: env.OPENROUTER_BASE_URL,
    apiKey:  env.OPENROUTER_API_KEY,
  },
}

const providerCache = new Map<ProviderId, Provider>()

export function getProvider(id: ProviderId): Provider {
  let provider = providerCache.get(id)
  if (!provider) {
    provider = new OpenAIProvider(PROVIDER_CONFIGS[id])
    providerCache.set(id, provider)
  }
  return provider
}
