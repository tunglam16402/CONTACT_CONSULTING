// Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface QueryParams extends PaginationParams {
  search?: string;
  filter?: Record<string, unknown>;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Auth Types
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}
