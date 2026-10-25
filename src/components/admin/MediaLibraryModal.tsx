import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Search, 
  Check, 
  Trash2, 
  ExternalLink, 
  AlertCircle,
  FileText,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { 
  MediaItem, 
  getAllMediaFromDB, 
  saveMediaItemToDB, 
  deleteMediaItemFromDB, 
  uploadAndSaveMediaFile
} from '../../utils/mediaStorage';
import { formatFileSize } from '../../utils/imageOptimizer';

export interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (media: { url: string; altText?: string; name?: string }) => void;
  onSelectMedia?: (media: { url: string; alt?: string; altText?: string; name?: string; title?: string }) => void;
  onSelectImage?: (url: string) => void;
  title?: string;
  allowedTypes?: ('image' | 'video' | 'icon')[];
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  onSelectMedia,
  onSelectImage,
  title = "Thư Viện Media — Chọn hoặc Tải Lên",
  allowedTypes = ['image', 'video', 'icon']
}) => {
  const handleChosenMedia = (mediaObj: { url: string; altText?: string; name?: string }) => {
    if (onSelect) onSelect(mediaObj);
    if (onSelectImage) onSelectImage(mediaObj.url);
    if (onSelectMedia) {
      onSelectMedia({
        url: mediaObj.url,
        alt: mediaObj.altText,
        altText: mediaObj.altText,
        name: mediaObj.name,
        title: mediaObj.name
      });
    }
  };

  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    stage: 'reading' | 'optimizing' | 'uploading' | 'complete' | 'error';
    percent: number;
    message: string;
    fileName: string;
    currentIndex: number;
    totalFiles: number;
    originalSize?: number;
    optimizedSize?: number;
    savingsPercent?: number;
  } | null>(null);

  const [customUrl, setCustomUrl] = useState('');
  const [customAlt, setCustomAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items from Neon DB & local cache
  const loadMedia = async () => {
    try {
      const list = await getAllMediaFromDB();
      setItems(list);
      if (list.length > 0 && !selectedItem) {
        setSelectedItem(list[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setUploadError(null);
      setUploadProgress(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const newlyAdded: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setUploadProgress({
          stage: 'reading',
          percent: 10,
          message: `Đang chuẩn bị (${i + 1}/${files.length}): ${file.name}`,
          fileName: file.name,
          currentIndex: i + 1,
          totalFiles: files.length,
          originalSize: file.size
        });

        const item = await uploadAndSaveMediaFile(file, {
          onProgress: (p) => {
            setUploadProgress({
              stage: p.stage,
              percent: p.percent,
              message: p.message,
              fileName: file.name,
              currentIndex: i + 1,
              totalFiles: files.length,
              originalSize: p.originalSize,
              optimizedSize: p.optimizedSize,
              savingsPercent: p.savingsPercent
            });
          }
        });

        newlyAdded.push(item);
      } catch (err: any) {
        setUploadError(`Lỗi khi tải tệp "${file.name}": ${err.message || 'Thất bại'}`);
        break;
      }
    }

    if (newlyAdded.length > 0) {
      await loadMedia();
      setSelectedItem(newlyAdded[newlyAdded.length - 1]);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(null);
        setActiveTab('library');
      }, 700);
    } else {
      setIsUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa file media này khỏi kho lưu trữ?")) {
      await deleteMediaItemFromDB(id);
      await loadMedia();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  const handleConfirmSelect = () => {
    if (activeTab === 'url') {
      if (!customUrl.trim()) return;
      handleChosenMedia({
        url: customUrl.trim(),
        altText: customAlt.trim() || 'Hình ảnh website'
      });
      onClose();
    } else if (selectedItem) {
      handleChosenMedia({
        url: selectedItem.url,
        altText: selectedItem.altText || selectedItem.name,
        name: selectedItem.name
      });
      onClose();
    }
  };

  const filteredItems = items.filter(item => {
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[88vh] max-h-[780px] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">{title}</h3>
              <p className="text-xs text-slate-500">Tối ưu hóa ảnh WebP tự động & Đồng bộ Cloud / Neon DB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-2 border-b border-slate-200 flex items-center gap-6 text-xs font-semibold bg-white">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'library'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Kho thư viện ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Tải lên từ máy tính (Tối ưu WebP)</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'url'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Nhập link URL trực tiếp</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* TAB 1: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <>
              {/* Media Grid View (Left) */}
              <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm theo tên file hoặc mô tả..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 rounded-xl border-none focus:outline-hidden focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        typeFilter === 'all' ? 'bg-primary-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setTypeFilter('image')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        typeFilter === 'image' ? 'bg-primary-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Hình ảnh
                    </button>
                    {allowedTypes.includes('video') && (
                      <button
                        onClick={() => setTypeFilter('video')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          typeFilter === 'video' ? 'bg-primary-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Video
                      </button>
                    )}
                  </div>
                </div>

                {/* Media Thumbnails Grid */}
                {filteredItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                    <ImageIcon className="w-12 h-12 mb-3 stroke-1 text-slate-300" />
                    <p className="font-semibold text-slate-600 mb-1">Không tìm thấy tệp media phù hợp</p>
                    <p className="text-slate-400 max-w-xs mb-4">Hãy tải ảnh từ máy tính hoặc đổi từ khóa tìm kiếm</p>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-xl text-xs hover:bg-primary-700 transition"
                    >
                      Tải tệp mới ngay
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredItems.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-primary-600 ring-2 ring-primary-600/20 shadow-md bg-primary-50/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                          }`}
                        >
                          {/* Thumbnail preview */}
                          <div className="aspect-square bg-slate-100 overflow-hidden flex items-center justify-center relative">
                            {item.type === 'video' ? (
                              <div className="flex flex-col items-center justify-center text-slate-400">
                                <Film className="w-8 h-8 mb-1" />
                                <span className="text-[10px] uppercase font-bold">Video</span>
                              </div>
                            ) : (
                              <img
                                src={item.thumbnailUrl || item.url}
                                alt={item.altText || item.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}

                            {/* Format & Size Badge */}
                            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white backdrop-blur-xs">
                              {item.mimeType.includes('webp') ? 'WEBP' : item.mimeType.includes('svg') ? 'SVG' : 'IMG'} • {formatFileSize(item.sizeBytes)}
                            </div>
                          </div>

                          {/* Selected Check Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center shadow">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Item Footer info */}
                          <div className="p-2 bg-white/95 text-[11px] truncate border-t border-slate-100 flex items-center justify-between">
                            <span className="truncate font-medium text-slate-800">{item.name}</span>
                            {!item.isExternal && (
                              <button
                                onClick={(e) => handleDeleteItem(item.id, e)}
                                title="Xóa khỏi thư viện"
                                className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Inspector Sidebar (Right) */}
              <div className="w-full md:w-80 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-5 flex flex-col justify-between">
                {selectedItem ? (
                  <div className="space-y-4 text-xs overflow-y-auto">
                    <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                      Thông tin chi tiết file
                    </span>
                    
                    <div className="aspect-video bg-white rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                      {selectedItem.type === 'video' ? (
                        <video src={selectedItem.url} controls className="max-h-full max-w-full" />
                      ) : (
                        <img src={selectedItem.url} alt={selectedItem.name} className="max-h-full max-w-full object-contain" />
                      )}
                    </div>

                    <div className="space-y-1.5 text-slate-600">
                      <p className="truncate"><strong>Tên:</strong> {selectedItem.name}</p>
                      <p><strong>Định dạng:</strong> <span className="uppercase font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded">{selectedItem.mimeType}</span></p>
                      {selectedItem.width && selectedItem.height && (
                        <p><strong>Độ phân giải:</strong> {selectedItem.width} × {selectedItem.height} px</p>
                      )}
                      <p><strong>Dung lượng tối ưu:</strong> <span className="font-semibold text-emerald-700">{formatFileSize(selectedItem.sizeBytes)}</span></p>
                      
                      {selectedItem.savingsPercent ? (
                        <p className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span>Đã giảm {selectedItem.savingsPercent}% dung lượng so với ảnh gốc</span>
                        </p>
                      ) : null}

                      <p className="text-[11px] text-slate-500">
                        <strong>Nơi lưu trữ:</strong> {
                          selectedItem.storageProvider === 'vercel-blob'
                            ? 'Vercel Blob Object Storage (CDN Toàn cầu)'
                            : selectedItem.isExternal
                            ? 'URL Bên ngoài (CDN)'
                            : 'Neon PostgreSQL & Bộ nhớ đệm máy chủ'
                        }
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Alt Text (Mô tả SEO/Trợ năng)</label>
                      <input
                        type="text"
                        value={selectedItem.altText || ''}
                        onChange={(e) => {
                          const updated = { ...selectedItem, altText: e.target.value };
                          setSelectedItem(updated);
                          saveMediaItemToDB(updated);
                          setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-primary-500"
                        placeholder="Mô tả ảnh cho công cụ tìm kiếm..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    <p>Chọn một tệp từ thư viện để xem thông tin chi tiết</p>
                  </div>
                )}

                {/* Footer Confirmation Button */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-100 transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    disabled={!selectedItem}
                    onClick={handleConfirmSelect}
                    className="px-5 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Sử dụng ảnh này</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: UPLOAD (HIGH-PERFORMANCE WEBP COMPRESSION) */}
          {activeTab === 'upload' && (
            <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center overflow-y-auto">
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`w-full max-w-xl p-8 sm:p-10 border-2 border-dashed rounded-3xl text-center space-y-4 transition ${
                  isUploading
                    ? 'border-primary-400 bg-primary-50/50 cursor-not-allowed pointer-events-none'
                    : 'border-primary-300 hover:border-primary-500 bg-primary-50/30 hover:bg-primary-50/60 cursor-pointer group'
                }`}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1">
                    Chọn một hoặc nhiều tệp ảnh từ máy tính
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Hỗ trợ <strong>JPG, PNG, WebP, SVG</strong> (Tối đa 15MB). Hệ thống sẽ tự động nén chuẩn <strong>WebP</strong> giữ nguyên độ sắc nét và tối ưu tốc độ tải trang vượt trội.
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />

                {!isUploading ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Duyệt tệp trên máy...</span>
                  </button>
                ) : null}

                {/* Real-time Progress Dashboard */}
                {isUploading && uploadProgress && (
                  <div className="mt-4 p-5 bg-white border border-primary-200 rounded-2xl shadow-sm text-left space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <RefreshCw className="w-3.5 h-3.5 text-primary-600 animate-spin" />
                        <span className="truncate max-w-[280px]">{uploadProgress.fileName}</span>
                      </div>
                      <span className="font-mono text-primary-700 font-bold text-sm">{uploadProgress.percent}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress.percent}%` }}
                      />
                    </div>

                    {/* Status Message */}
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="truncate">{uploadProgress.message}</span>
                      {uploadProgress.totalFiles > 1 && (
                        <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full font-semibold">
                          Tệp {uploadProgress.currentIndex}/{uploadProgress.totalFiles}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="mt-4 max-w-xl w-full p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{uploadError}</span>
                  </div>
                  <button
                    onClick={() => {
                      setUploadError(null);
                      fileInputRef.current?.click();
                    }}
                    className="px-2.5 py-1 bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-[11px] transition"
                  >
                    Thử lại
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="flex-1 p-8 max-w-xl mx-auto space-y-5 overflow-y-auto">
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Nhập URL hình ảnh hoặc video</h4>
                <p className="text-xs text-slate-500">Sử dụng URL trực tiếp từ máy chủ CDN, Unsplash, Imgur hoặc YouTube.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Đường dẫn URL ảnh/video (*)</label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... hoặc https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alt Text (Mô tả hình ảnh)</label>
                  <input
                    type="text"
                    value={customAlt}
                    onChange={(e) => setCustomAlt(e.target.value)}
                    placeholder="VD: Bác sĩ đang kiểm tra da cho khách hàng..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 text-xs"
                  />
                </div>

                {customUrl && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="font-semibold text-slate-700 block">Xem trước ảnh từ URL:</span>
                    <div className="aspect-video bg-white rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                      <img 
                        src={customUrl} 
                        alt="Preview" 
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  disabled={!customUrl.trim()}
                  onClick={handleConfirmSelect}
                  className="px-5 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Sử dụng ảnh này</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
