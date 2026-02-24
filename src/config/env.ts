import { z } from "zod"

const envSchema = z.object({
  PORT:               z.string().default("8080"),
  GITHUB_TOKEN:       z.string().min(1),
  GROQ_API_KEY:       z.string().min(1),
  CEREBRAS_API_KEY:   z.string().min(1),
  OPENROUTER_API_KEY: z.string().min(1),
  GITHUB_BASE_URL:    z.string().default("https://models.inference.ai.azure.com"),
  GROQ_BASE_URL:      z.string().default("https://api.groq.com/openai/v1"),
  CEREBRAS_BASE_URL:  z.string().default("https://api.cerebras.ai/v1"),
  OPENROUTER_BASE_URL: z.string().default("https://openrouter.ai/api/v1"),
  PROXY_API_KEY:      z.string().min(1),
  LOG_LEVEL:          z.string().default("info"),
  NODE_ENV:           z.enum(["development", "production"]).default("development"),
})

export const env = envSchema.parse(process.env) 
