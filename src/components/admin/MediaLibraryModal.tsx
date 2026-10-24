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
  FileText
} from 'lucide-react';
import { 
  MediaItem, 
  getAllMediaFromDB, 
  saveMediaItemToDB, 
  deleteMediaItemFromDB, 
  fileToMediaItem 
} from '../../utils/mediaStorage';

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
  const [customUrl, setCustomUrl] = useState('');
  const [customAlt, setCustomAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items from IndexedDB
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
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const file = files[0];
      const mediaItem = await fileToMediaItem(file);
      await saveMediaItemToDB(mediaItem);
      await loadMedia();
      setSelectedItem(mediaItem);
      setActiveTab('library');
    } catch (err: any) {
      setUploadError(err.message || 'Lỗi khi tải file lên');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa file media này khỏi thư viện cục bộ?")) {
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
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{title}</h3>
              <p className="text-xs text-slate-500">Lưu trữ cục bộ IndexedDB — hỗ trợ ảnh chất lượng cao và URL CDN</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-4 text-xs font-semibold bg-white">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'library'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Thư viện media ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'upload'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            Tải lên từ máy tính
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'url'
                ? 'border-primary-600 text-primary-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Nhập URL trực tiếp
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* TAB 1: LIBRARY */}
          {activeTab === 'library' && (
            <>
              {/* Media Grid (Left) */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm file..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                    />
                  </div>

                  <div className="flex gap-1.5 self-start sm:self-auto text-xs">
                    <button
                      onClick={() => setTypeFilter('all')}
                      className={`px-3 py-1 rounded-lg ${
                        typeFilter === 'all' ? 'bg-primary-600 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setTypeFilter('image')}
                      className={`px-3 py-1 rounded-lg ${
                        typeFilter === 'image' ? 'bg-primary-600 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Hình ảnh
                    </button>
                    <button
                      onClick={() => setTypeFilter('video')}
                      className={`px-3 py-1 rounded-lg ${
                        typeFilter === 'video' ? 'bg-primary-600 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Video
                    </button>
                  </div>
                </div>

                {/* Grid */}
                {filteredItems.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <ImageIcon className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="text-xs">Không tìm thấy file media nào phù hợp.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredItems.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary-600 ring-2 ring-primary-500/30 shadow-md scale-[1.02]'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                            {item.type === 'video' ? (
                              <div className="flex flex-col items-center justify-center text-slate-400">
                                <Film className="w-10 h-10 mb-1" />
                                <span className="text-[10px] uppercase font-bold">Video</span>
                              </div>
                            ) : (
                              <img
                                src={item.url}
                                alt={item.altText || item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
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
                                <Trash2 className="w-3 h-3" />
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

                    <div className="space-y-2 text-slate-600">
                      <p className="truncate"><strong>Tên:</strong> {selectedItem.name}</p>
                      <p><strong>Loại:</strong> <span className="uppercase">{selectedItem.mimeType}</span></p>
                      {selectedItem.width && selectedItem.height && (
                        <p><strong>Kích thước:</strong> {selectedItem.width} × {selectedItem.height} px</p>
                      )}
                      <p><strong>Dung lượng:</strong> {(selectedItem.sizeBytes / 1024).toFixed(1)} KB</p>
                      <p><strong>Lưu trữ:</strong> {selectedItem.isExternal ? 'URL Bên ngoài (Unsplash/CDN)' : 'IndexedDB Cục bộ'}</p>
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
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="Mô tả ảnh cho công cụ tìm kiếm..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400">
                    <p>Chọn một file media để xem trước và chèn vào trang.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmSelect}
                    disabled={!selectedItem}
                    className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Chèn file đã chọn
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: UPLOAD */}
          {activeTab === 'upload' && (
            <div className="flex-1 p-8 flex flex-col items-center justify-center">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-lg p-10 border-2 border-dashed border-primary-300 hover:border-primary-500 bg-primary-50/30 hover:bg-primary-50/60 rounded-3xl cursor-pointer text-center space-y-4 transition group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    Nhấp vào đây để chọn file từ máy tính
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Hỗ trợ định dạng JPG, PNG, WebP, SVG hoặc MP4 (Tối đa 15MB). File được lưu trữ an toàn trong IndexedDB của trình duyệt.
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {isUploading && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow text-xs font-semibold text-primary-700">
                    <div className="w-3.5 h-3.5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    Đang xử lý và lưu vào IndexedDB...
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="flex-1 p-8 max-w-xl mx-auto space-y-5">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alt Text (Mô tả hình ảnh)</label>
                  <input
                    type="text"
                    value={customAlt}
                    onChange={(e) => setCustomAlt(e.target.value)}
                    placeholder="VD: Bác sĩ đang kiểm tra da cho khách hàng..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
                  />
                </div>

                {customUrl && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Xem trước</span>
                    <div className="aspect-video bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                      <img 
                        src={customUrl} 
                        alt="Preview" 
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmSelect}
                    disabled={!customUrl.trim()}
                    className="px-5 py-2.5 font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded-xl shadow transition"
                  >
                    Xác nhận sử dụng URL
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
