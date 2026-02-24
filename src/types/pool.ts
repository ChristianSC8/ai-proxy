export const Pool = {
  Hot: "hot",
  Warm: "warm",
  Cold: "cold",
} as const

export type Pool = typeof Pool[keyof typeof Pool]

export const POOL_ORDER = [
  Pool.Hot,
  Pool.Warm,
  Pool.Cold
] as const
