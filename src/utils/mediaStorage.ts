/**
 * IndexedDB Media Storage for LBC Professional CMS
 * Allows uploading and persistently storing image and video blobs locally
 * without exceeding the localStorage 5MB quota.
 */

export interface MediaItem {
  id: string;
  name: string;
  url: string; // Data URL or external URL
  type: 'image' | 'video' | 'icon' | 'document';
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  altText: string;
  caption?: string;
  createdAt: string;
  isExternal?: boolean;
}

const DB_NAME = 'LBC_CMS_MEDIA_DB';
const DB_VERSION = 1;
const STORE_NAME = 'media_files';

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });

  return dbPromise;
}

// Initial seed media items from existing project assets
export const initialMediaItems: MediaItem[] = [
  {
    id: "med-logo-header",
    name: "Logo LBC Brand Header",
    url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230E7C86'/><path d='M30 75V25H42V65H70V75H30Z' fill='white'/><circle cx='68' cy='32' r='8' fill='%23EEF7F8'/></svg>",
    type: "image",
    mimeType: "image/svg+xml",
    sizeBytes: 1024,
    width: 100,
    height: 100,
    altText: "Logo Phòng khám Da liễu Lạc's Beauty Center",
    createdAt: "2026-10-20T08:00:00.000Z",
    isExternal: true
  },
  {
    id: "med-doc-01",
    name: "Chân dung ThS.BS. Lạc Kim Ngân",
    url: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 345000,
    width: 1200,
    height: 1600,
    altText: "Chân dung Thạc sĩ Bác sĩ Lạc Kim Ngân",
    createdAt: "2026-10-21T09:00:00.000Z",
    isExternal: true
  },
  {
    id: "med-doc-02",
    name: "Chân dung BSCKI. Nguyễn Văn An",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 320000,
    width: 1200,
    height: 1600,
    altText: "Chân dung BSCKI Nguyễn Văn An",
    createdAt: "2026-10-21T09:15:00.000Z",
    isExternal: true
  },
  {
    id: "med-doc-03",
    name: "Chân dung ThS.BS. Trần Thị Bích Thảo",
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 310000,
    width: 1200,
    height: 1600,
    altText: "Chân dung ThS.BS Trần Thị Bích Thảo",
    createdAt: "2026-10-21T09:30:00.000Z",
    isExternal: true
  },
  {
    id: "med-doc-04",
    name: "Chân dung BSCKII. Lê Hoàng Nam",
    url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 380000,
    width: 1200,
    height: 1600,
    altText: "Chân dung BSCKII Lê Hoàng Nam",
    createdAt: "2026-10-21T09:45:00.000Z",
    isExternal: true
  },
  {
    id: "med-banner-01",
    name: "Hero Banner - Tiên phong Công nghệ cao",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 420000,
    width: 1600,
    height: 900,
    altText: "Banner Tiên phong Công nghệ cao Y học cá nhân hóa",
    createdAt: "2026-10-20T10:00:00.000Z",
    isExternal: true
  },
  {
    id: "med-tech-visia",
    name: "Máy Soi Da VISIA 3D",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 290000,
    width: 1200,
    height: 800,
    altText: "Hệ thống máy soi da đa tầng VISIA 3D",
    createdAt: "2026-10-20T10:30:00.000Z",
    isExternal: true
  },
  {
    id: "med-clinic-interior",
    name: "Không Gian Phòng Khám Cơ Sở 01",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    type: "image",
    mimeType: "image/jpeg",
    sizeBytes: 450000,
    width: 1600,
    height: 1000,
    altText: "Không gian phòng khám chuẩn y khoa Lạc's Beauty Center Cần Thơ",
    createdAt: "2026-10-20T11:00:00.000Z",
    isExternal: true
  }
];

export async function getAllMediaFromDB(): Promise<MediaItem[]> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const storedItems = request.result as MediaItem[];
        if (!storedItems || storedItems.length === 0) {
          // Initialize with seed items if store is empty
          saveAllMediaToDB(initialMediaItems).then(() => resolve(initialMediaItems));
        } else {
          resolve(storedItems);
        }
      };

      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('IndexedDB unavailable, falling back to initial media items', e);
    return initialMediaItems;
  }
}

export async function saveMediaItemToDB(item: MediaItem): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error('Failed to save media item to IndexedDB', e);
  }
}

export async function saveAllMediaToDB(items: MediaItem[]): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      items.forEach(item => {
        store.put(item);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (e) {
    console.error('Failed to save items to IndexedDB', e);
  }
}

export async function deleteMediaItemFromDB(id: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error('Failed to delete media item from IndexedDB', e);
  }
}

/**
 * Convert user selected File from input[type=file] to MediaItem
 */
export function fileToMediaItem(file: File): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    // Validate file type
    const validMimes = [
      'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
      'video/mp4', 'video/webm'
    ];
    if (!validMimes.includes(file.type)) {
      reject(new Error(`Định dạng file ${file.type} không được hỗ trợ. Vui lòng chọn JPG, PNG, WebP hoặc MP4.`));
      return;
    }

    // 15MB limit for local demo storage
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      reject(new Error(`File quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Giới hạn tối đa là 15MB.`));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      const isVideo = file.type.startsWith('video/');

      if (isVideo) {
        resolve({
          id: 'med-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          name: file.name.replace(/\.[^/.]+$/, ""),
          url: result,
          type: 'video',
          mimeType: file.type,
          sizeBytes: file.size,
          altText: file.name,
          createdAt: new Date().toISOString(),
          isExternal: false
        });
      } else {
        // Calculate image dimensions
        const img = new Image();
        img.onload = () => {
          resolve({
            id: 'med-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            name: file.name.replace(/\.[^/.]+$/, ""),
            url: result,
            type: 'image',
            mimeType: file.type,
            sizeBytes: file.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
            altText: file.name,
            createdAt: new Date().toISOString(),
            isExternal: false
          });
        };
        img.onerror = () => {
          // If svg or unreadable dimensions, still return item
          resolve({
            id: 'med-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            name: file.name.replace(/\.[^/.]+$/, ""),
            url: result,
            type: 'image',
            mimeType: file.type,
            sizeBytes: file.size,
            altText: file.name,
            createdAt: new Date().toISOString(),
            isExternal: false
          });
        };
        img.src = result;
      }
    };

    reader.onerror = () => {
      reject(new Error('Lỗi khi đọc file trên máy tính.'));
    };

    reader.readAsDataURL(file);
  });
}
