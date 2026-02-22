/**
 * File Upload Security Validation
 * Protects against malicious file uploads, oversized files, and path traversal
 */

export interface FileValidationOptions {
  maxSizeBytes?: number;
  allowedMimeTypes?: string[];
  allowedExtensions?: string[];
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

const DEFAULT_ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // Text
  'text/plain',
  'text/csv',
];

const DEFAULT_ALLOWED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx',
  '.txt', '.csv',
];

const DANGEROUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.pif', '.scr',
  '.vbs', '.js', '.jar', '.zip', '.rar',
  '.sh', '.bash', '.ps1', '.app', '.deb', '.rpm',
];

/**
 * Validate file size
 */
export function validateFileSize(
  sizeBytes: number,
  maxSizeBytes: number = DEFAULT_MAX_SIZE
): FileValidationResult {
  if (sizeBytes > maxSizeBytes) {
    const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${maxSizeMB}MB`,
    };
  }
  return { valid: true };
}

/**
 * Validate file MIME type
 */
export function validateMimeType(
  mimeType: string,
  allowedTypes: string[] = DEFAULT_ALLOWED_MIME_TYPES
): FileValidationResult {
  if (!allowedTypes.includes(mimeType.toLowerCase())) {
    return {
      valid: false,
      error: `File type '${mimeType}' is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }
  return { valid: true };
}

/**
 * Validate file extension
 */
export function validateFileExtension(
  filename: string,
  allowedExtensions: string[] = DEFAULT_ALLOWED_EXTENSIONS
): FileValidationResult {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  // Check for dangerous extensions
  if (DANGEROUS_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Executable files are not allowed`,
    };
  }
  
  // Check if extension is in allowed list
  if (!allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension '${ext}' is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`,
    };
  }
  
  return { valid: true };
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '');
  
  // Remove directory separators
  sanitized = sanitized.replace(/[\/\\]/g, '');
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Remove special characters that could cause issues
  sanitized = sanitized.replace(/[<>:"|?*]/g, '');
  
  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'));
    const name = sanitized.substring(0, 255 - ext.length);
    sanitized = name + ext;
  }
  
  // If filename becomes empty after sanitization, use a default
  if (!sanitized || sanitized === '') {
    sanitized = `file-${Date.now()}`;
  }
  
  return sanitized;
}

/**
 * Generate a unique, safe filename
 */
export function generateSafeFilename(originalFilename: string): string {
  const sanitized = sanitizeFilename(originalFilename);
  const ext = sanitized.substring(sanitized.lastIndexOf('.'));
  const nameWithoutExt = sanitized.substring(0, sanitized.lastIndexOf('.'));
  
  // Add timestamp and random suffix to prevent collisions
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  
  return `${nameWithoutExt}-${timestamp}-${random}${ext}`;
}

/**
 * Comprehensive file validation
 */
export function validateFile(
  filename: string,
  mimeType: string,
  sizeBytes: number,
  options: FileValidationOptions = {}
): FileValidationResult {
  // Validate size
  const sizeValidation = validateFileSize(
    sizeBytes,
    options.maxSizeBytes || DEFAULT_MAX_SIZE
  );
  if (!sizeValidation.valid) {
    return sizeValidation;
  }
  
  // Validate MIME type
  const mimeValidation = validateMimeType(
    mimeType,
    options.allowedMimeTypes || DEFAULT_ALLOWED_MIME_TYPES
  );
  if (!mimeValidation.valid) {
    return mimeValidation;
  }
  
  // Validate extension
  const extValidation = validateFileExtension(
    filename,
    options.allowedExtensions || DEFAULT_ALLOWED_EXTENSIONS
  );
  if (!extValidation.valid) {
    return extValidation;
  }
  
  return { valid: true };
}

/**
 * Validate and prepare file for upload
 */
export function prepareFileForUpload(
  filename: string,
  mimeType: string,
  sizeBytes: number,
  options: FileValidationOptions = {}
): { valid: boolean; error?: string; safeFilename?: string } {
  // Validate file
  const validation = validateFile(filename, mimeType, sizeBytes, options);
  if (!validation.valid) {
    return validation;
  }
  
  // Generate safe filename
  const safeFilename = generateSafeFilename(filename);
  
  return {
    valid: true,
    safeFilename,
  };
}
