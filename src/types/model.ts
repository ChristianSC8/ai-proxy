import type { Pool } from "./pool.ts"
import type { ProviderId } from "./provider.ts"

export interface AIModel {
  id: string
  modelName: string
  pool: Pool
  providerId: ProviderId
}
