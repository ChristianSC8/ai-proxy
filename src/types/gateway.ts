import type { Pool } from "./pool.ts"

export const Role = {
  System: "system",
  User: "user",
  Assistant: "assistant",
} as const

export type Role = typeof Role[keyof typeof Role]

export interface Message {
  role: Role
  content: string
}

export interface ChatRequest {
  messages: Message[]
  maxTokens?: number
  temperature?: number
  stream?: boolean
}

export interface ChatResult {
  content: string
  modelId: string
  pool: Pool
  attempts: number
}

export interface ModelStatus {
  id: string
  model: string
  pool: Pool
  provider: string
  available: boolean
}

export interface HealthStatus {
  status: "ok"
  models: number
  available: number
  cooledDown: number
}

export interface CooldownStatus {
  modelId: string
  expiresAt: string
  remainingMs: number
}

export interface ChatCompletion {
  id: string
  object: "chat.completion"
  created: number
  model: string
  choices: Array<{
    index: number
    message: { role: "assistant"; content: string }
    finish_reason: "stop"
  }>
}

export interface ChatCompletionChunk {
  id: string
  object: "chat.completion.chunk"
  created: number
  model: string
  choices: Array<{
    index: number
    delta: { role?: "assistant"; content?: string }
    finish_reason: "stop" | null
  }>
}

export interface StreamResult {
  stream: ReadableStream<ChatCompletionChunk>
  modelId: string
  pool: Pool
  attempts: number
}
