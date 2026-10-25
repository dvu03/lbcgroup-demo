/**
 * Professional Image Optimization Utility for LBC CMS
 * - In-browser WebP compression with aspect-ratio preservation
 * - SVG sanitization against XSS
 * - Thumbnail generation
 * - Detailed progress tracking (Reading -> Optimizing -> Ready)
 */

export interface OptimizedImageResult {
  file: File | Blob;
  dataUrl: string;
  thumbnailUrl: string;
  name: string;
  mimeType: string;
  originalSizeBytes: number;
  optimizedSizeBytes: number;
  width: number;
  height: number;
  savingsPercent: number;
  isSvg: boolean;
}

export type ProgressCallback = (progress: {
  stage: 'reading' | 'optimizing' | 'uploading' | 'complete' | 'error';
  percent: number;
  message: string;
  originalSize?: number;
  optimizedSize?: number;
  savingsPercent?: number;
}) => void;

/**
 * Sanitize SVG content to prevent XSS attacks while keeping vector graphics intact
 */
export function sanitizeSvg(svgContent: string): string {
  // Remove script tags and contents
  let clean = svgContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove inline event handlers like onload, onclick, onerror
  clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  clean = clean.replace(/on\w+\s*=\s*[^"'\s>]+/gi, '');
  // Remove javascript: URIs
  clean = clean.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  clean = clean.replace(/xlink:href\s*=\s*["']javascript:[^"']*["']/gi, 'xlink:href="#"');
  return clean;
}

/**
 * Optimizes an image File or Blob:
 * - Raster (JPEG, PNG, WebP) -> WebP 82% quality, max 1920px (preserving aspect ratio)
 * - SVG -> Sanitized vector SVG
 */
export async function optimizeImageFile(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    onProgress?: ProgressCallback;
  } = {}
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    onProgress
  } = options;

  const originalSizeBytes = file.size;

  onProgress?.({
    stage: 'reading',
    percent: 15,
    message: `Đang đọc tệp "${file.name}" (${formatFileSize(originalSizeBytes)})...`,
    originalSize: originalSizeBytes
  });

  // 1. Handle SVG files
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    onProgress?.({
      stage: 'optimizing',
      percent: 50,
      message: 'Đang kiểm tra bảo mật & tối ưu vector SVG...',
      originalSize: originalSizeBytes
    });

    const text = await file.text();
    const sanitized = sanitizeSvg(text);
    const blob = new Blob([sanitized], { type: 'image/svg+xml' });
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(sanitized)}`;

    // Extract viewBox or dimensions from SVG if present
    const widthMatch = text.match(/width=["'](\d+)["']/);
    const heightMatch = text.match(/height=["'](\d+)["']/);
    const viewBoxMatch = text.match(/viewBox=["'][\d\s]+ (\d+) (\d+)["']/);

    const width = widthMatch ? parseInt(widthMatch[1], 10) : (viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 100);
    const height = heightMatch ? parseInt(heightMatch[1], 10) : (viewBoxMatch ? parseInt(viewBoxMatch[2], 10) : 100);

    onProgress?.({
      stage: 'optimizing',
      percent: 90,
      message: 'Đã tối ưu hóa vector SVG an toàn.',
      originalSize: originalSizeBytes,
      optimizedSize: blob.size,
      savingsPercent: Math.round(((originalSizeBytes - blob.size) / originalSizeBytes) * 100)
    });

    return {
      file: blob,
      dataUrl,
      thumbnailUrl: dataUrl,
      name: file.name,
      mimeType: 'image/svg+xml',
      originalSizeBytes,
      optimizedSizeBytes: blob.size,
      width,
      height,
      savingsPercent: 0,
      isSvg: true
    };
  }

  // 2. Handle Raster images (JPEG, PNG, WebP)
  onProgress?.({
    stage: 'reading',
    percent: 30,
    message: 'Đang nạp ảnh vào bộ nhớ đồ họa...',
    originalSize: originalSizeBytes
  });

  const img = await loadImageFromFile(file);

  onProgress?.({
    stage: 'optimizing',
    percent: 60,
    message: `Đang nén chuẩn WebP (${img.naturalWidth}x${img.naturalHeight})...`,
    originalSize: originalSizeBytes
  });

  // Calculate target dimensions preserving exact aspect ratio
  let targetWidth = img.naturalWidth;
  let targetHeight = img.naturalHeight;

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
    targetWidth = Math.round(targetWidth * ratio);
    targetHeight = Math.round(targetHeight * ratio);
  }

  // Create primary optimized canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) throw new Error('Không thể khởi tạo Canvas 2D');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Convert to WebP (or fallback to JPEG if WebP unsupported)
  let targetMime = 'image/webp';
  let optimizedDataUrl = canvas.toDataURL('image/webp', quality);
  if (!optimizedDataUrl.startsWith('data:image/webp')) {
    targetMime = 'image/jpeg';
    optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
  }

  // Convert dataURL to Blob for size calculation & network upload
  const optimizedBlob = await dataUrlToBlob(optimizedDataUrl);
  const optimizedSizeBytes = optimizedBlob.size;
  const savingsPercent = originalSizeBytes > 0
    ? Math.max(0, Math.round(((originalSizeBytes - optimizedSizeBytes) / originalSizeBytes) * 100))
    : 0;

  // 3. Generate small thumbnail (max 280x280) for snappy gallery preview
  const thumbRatio = Math.min(280 / targetWidth, 280 / targetHeight, 1);
  const thumbWidth = Math.round(targetWidth * thumbRatio);
  const thumbHeight = Math.round(targetHeight * thumbRatio);

  const thumbCanvas = document.createElement('canvas');
  thumbCanvas.width = thumbWidth;
  thumbCanvas.height = thumbHeight;
  const thumbCtx = thumbCanvas.getContext('2d');
  if (thumbCtx) {
    thumbCtx.imageSmoothingEnabled = true;
    thumbCtx.imageSmoothingQuality = 'medium';
    thumbCtx.drawImage(canvas, 0, 0, thumbWidth, thumbHeight);
  }
  const thumbnailUrl = thumbCanvas.toDataURL('image/webp', 0.7);

  // Derive new clean filename with .webp
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const optimizedFileName = `${baseName}.webp`;

  onProgress?.({
    stage: 'optimizing',
    percent: 85,
    message: `Tối ưu hoàn tất! Dung lượng giảm ${savingsPercent}% (từ ${formatFileSize(originalSizeBytes)} xuống ${formatFileSize(optimizedSizeBytes)})`,
    originalSize: originalSizeBytes,
    optimizedSize: optimizedSizeBytes,
    savingsPercent
  });

  return {
    file: new File([optimizedBlob], optimizedFileName, { type: targetMime }),
    dataUrl: optimizedDataUrl,
    thumbnailUrl,
    name: optimizedFileName,
    mimeType: targetMime,
    originalSizeBytes,
    optimizedSizeBytes,
    width: targetWidth,
    height: targetHeight,
    savingsPercent,
    isSvg: false
  };
}

/**
 * Helper to load an image safely into an HTMLImageElement
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Không thể giải mã định dạng ảnh "${file.name}". File có thể bị hỏng.`));
    };
    img.src = url;
  });
}

/**
 * Convert a Data URL to a Blob
 */
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return await res.blob();
}

/**
 * Format bytes to readable size
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
