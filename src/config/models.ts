import { Pool } from "../types/pool.ts"
import { ProviderId } from "../types/provider.ts"
import type { AIModel } from "../types/model.ts"

export const MODELS: AIModel[] = [

  // ========== GitHub ==========

  // Hot
  {
    id:         "github-gpt-4.1-hot",
    modelName:  "openai/gpt-4.1",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-gpt-4.1-mini-hot",
    modelName:  "openai/gpt-4.1-mini",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-llama-4-maverick-hot",
    modelName:  "meta/Llama-4-Maverick-17B-128E-Instruct-FP8",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-llama-3.3-70b-hot",
    modelName:  "meta/Llama-3.3-70B-Instruct",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-mistral-medium-hot",
    modelName:  "mistral-ai/mistral-medium-2505",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-command-r-plus-hot",
    modelName:  "cohere/Cohere-command-r-plus-08-2024",
    pool:       Pool.Hot,
    providerId: ProviderId.GitHub,
  },

  // Warm
  {
    id:         "github-gpt-4o-warm",
    modelName:  "openai/gpt-4o",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-gpt-4.1-nano-warm",
    modelName:  "openai/gpt-4.1-nano",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-llama-4-scout-warm",
    modelName:  "meta/Llama-4-Scout-17B-16E-Instruct",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-llama-3.1-405b-warm",
    modelName:  "meta/Meta-Llama-3.1-405B-Instruct",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-mistral-small-warm",
    modelName:  "mistral-ai/mistral-small-2503",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-cohere-command-a-warm",
    modelName:  "cohere/cohere-command-a",
    pool:       Pool.Warm,
    providerId: ProviderId.GitHub,
  },

  // Cold
  {
    id:         "github-gpt-4o-mini-cold",
    modelName:  "openai/gpt-4o-mini",
    pool:       Pool.Cold,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-llama-3.1-8b-cold",
    modelName:  "meta/Meta-Llama-3.1-8B-Instruct",
    pool:       Pool.Cold,
    providerId: ProviderId.GitHub,
  },
  {
    id:         "github-ministral-3b-cold",
    modelName:  "mistral-ai/Ministral-3B",
    pool:       Pool.Cold,
    providerId: ProviderId.GitHub,
  },

  // ========== Groq ==========

  // Hot
  {
    id:         "groq-gpt-oss-120b-hot",
    modelName:  "openai/gpt-oss-120b",
    pool:       Pool.Hot,
    providerId: ProviderId.Groq,
  },
  {
    id:         "groq-qwen3-32b-hot",
    modelName:  "qwen/qwen3-32b",
    pool:       Pool.Hot,
    providerId: ProviderId.Groq,
  },
  {
    id:         "groq-gpt-oss-20b-hot",
    modelName:  "openai/gpt-oss-20b",
    pool:       Pool.Hot,
    providerId: ProviderId.Groq,
  },

  // Warm
  {
    id:         "groq-llama-3.3-70b-warm",
    modelName:  "llama-3.3-70b-versatile",
    pool:       Pool.Warm,
    providerId: ProviderId.Groq,
  },
  {
    id:         "groq-llama-4-scout-warm",
    modelName:  "meta-llama/llama-4-scout-17b-16e-instruct",
    pool:       Pool.Warm,
    providerId: ProviderId.Groq,
  },

  // Cold
  {
    id:         "groq-llama-3.1-8b-cold",
    modelName:  "llama-3.1-8b-instant",
    pool:       Pool.Cold,
    providerId: ProviderId.Groq,
  },

  // ========== Cerebras ==========

  // Hot
  {
    id:         "cerebras-gpt-oss-120b-hot",
    modelName:  "gpt-oss-120b",
    pool:       Pool.Hot,
    providerId: ProviderId.Cerebras,
  },
  {
    id:         "cerebras-qwen3-235b-hot",
    modelName:  "qwen-3-235b-a22b-instruct-2507",
    pool:       Pool.Hot,
    providerId: ProviderId.Cerebras,
  },

  // Cold
  {
    id:         "cerebras-llama-3.1-8b-cold",
    modelName:  "llama3.1-8b",
    pool:       Pool.Cold,
    providerId: ProviderId.Cerebras,
  },

  // ========== OpenRouter ==========

  // Hot
  {
    id:         "openrouter-gpt-oss-120b-hot",
    modelName:  "openai/gpt-oss-120b:free",
    pool:       Pool.Hot,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-llama-3.3-70b-hot",
    modelName:  "meta-llama/llama-3.3-70b-instruct:free",
    pool:       Pool.Hot,
    providerId: ProviderId.OpenRouter,
  },

  // Warm
  {
    id:         "openrouter-gemma-3-27b-warm",
    modelName:  "google/gemma-3-27b-it:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-nemotron-warm",
    modelName:  "nvidia/nemotron-3-nano-30b-a3b:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-gpt-oss-20b-warm",
    modelName:  "openai/gpt-oss-20b:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-trinity-large-warm",
    modelName:  "arcee-ai/trinity-large-preview:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-step-3.5-flash-warm",
    modelName:  "stepfun/step-3.5-flash:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-mistral-small-warm",
    modelName:  "mistralai/mistral-small-3.1-24b-instruct:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-qwen3-next-warm",
    modelName:  "qwen/qwen3-next-80b-a3b-instruct:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },
  {
    id:         "openrouter-glm-4.5-air-warm",
    modelName:  "z-ai/glm-4.5-air:free",
    pool:       Pool.Warm,
    providerId: ProviderId.OpenRouter,
  },

  // Cold
  {
    id:         "openrouter-trinity-mini-cold",
    modelName:  "arcee-ai/trinity-mini:free",
    pool:       Pool.Cold,
    providerId: ProviderId.OpenRouter,
  },
]
