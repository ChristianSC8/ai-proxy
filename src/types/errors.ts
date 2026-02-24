export const ErrorKind = {
  RateLimit:   "rate_limit",
  ServerError: "server_error",
  Timeout:     "timeout",
  Auth:        "auth",
  Unknown:     "unknown",
} as const

export type ErrorKind = typeof ErrorKind[keyof typeof ErrorKind]

interface ErrorBehavior {
  retryable:  boolean
  fallback:   boolean
  cooldown:   boolean
  httpStatus: number
}

const BEHAVIOR: Record<ErrorKind, ErrorBehavior> = {
  rate_limit:   { retryable: false, fallback: true,  cooldown: true,  httpStatus: 429 },
  server_error: { retryable: true,  fallback: true,  cooldown: false, httpStatus: 502 },
  timeout:      { retryable: true,  fallback: true,  cooldown: false, httpStatus: 504 },
  auth:         { retryable: false, fallback: false, cooldown: false, httpStatus: 403 },
  unknown:      { retryable: false, fallback: false, cooldown: false, httpStatus: 500 },
}

const STATUS_KIND: Record<number, ErrorKind> = {
  429: ErrorKind.RateLimit,
  401: ErrorKind.Auth,
  403: ErrorKind.Auth,
  500: ErrorKind.ServerError,
  502: ErrorKind.ServerError,
  503: ErrorKind.ServerError,
  504: ErrorKind.Timeout,
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export class AppError extends Error {
  public readonly behavior: ErrorBehavior

  private constructor(
    public readonly kind:    ErrorKind,
    public readonly modelId: string,
    message: string,
  ) {
    super(message)
    this.name = "AppError"
    this.behavior = BEHAVIOR[kind]
  }

  static fromHttpStatus(status: number, modelId: string): AppError {
    const kind = STATUS_KIND[status] ?? ErrorKind.Unknown
    return new AppError(kind, modelId, `${modelId} responded with ${status}`)
  }

  static emptyResponse(modelId: string): AppError {
    return new AppError(ErrorKind.Unknown, modelId, `${modelId} returned empty response`)
  }

  static exhausted(): AppError {
    return new AppError(ErrorKind.Unknown, "all", "All pools exhausted")
  }
}
