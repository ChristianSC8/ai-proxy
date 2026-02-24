import type { ChatRequest, ChatResult, StreamResult } from "./gateway.ts"
import type { AIModel } from "./model.ts"

export const ProviderId = {
  GitHub:     "github",
  Groq:       "groq",
  Cerebras:   "cerebras",
  OpenRouter: "openrouter",
} as const

export type ProviderId = typeof ProviderId[keyof typeof ProviderId]

export interface ProviderConfig {
  baseUrl: string
  apiKey:  string
}

export interface Provider {
  complete(request: ChatRequest, model: AIModel): Promise<ChatResult>
  completeStream(request: ChatRequest, model: AIModel): Promise<StreamResult>
}
