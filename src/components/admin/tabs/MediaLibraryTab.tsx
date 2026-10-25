import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Film,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  Grid,
  List,
  CheckCircle2,
  Copy,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
  RefreshCw,
  HardDrive
} from "lucide-react";
import {
  MediaItem,
  getAllMediaFromDB,
  saveMediaItemToDB,
  deleteMediaItemFromDB,
  uploadAndSaveMediaFile
} from "../../../utils/mediaStorage";
import { formatFileSize } from "../../../utils/imageOptimizer";
import { ConfirmationModal } from "../ConfirmationModal";

export const MediaLibraryTab: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video" | "icon">("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showAddUrlModal, setShowAddUrlModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // New URL state
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newType, setNewType] = useState<"image" | "video">("image");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await getAllMediaFromDB();
      setMediaList(items);
      if (items.length > 0 && !selectedItem) {
        setSelectedItem(items[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedItems: MediaItem[] = [];

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

        uploadedItems.push(item);
      } catch (err: any) {
        alert(`Lỗi khi tải tệp "${file.name}": ${err.message || 'Thất bại'}`);
        break;
      }
    }

    if (uploadedItems.length > 0) {
      await loadMedia();
      setSelectedItem(uploadedItems[uploadedItems.length - 1]);
      showToast(`Đã tải lên và tối ưu hóa ${uploadedItems.length} tệp thành công!`);
    }

    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(null);
    }, 600);

    e.target.value = "";
  };

  const handleAddExternalUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const isVideo = newType === "video" || newUrl.endsWith(".mp4") || newUrl.includes("youtube") || newUrl.includes("youtu.be");
    const item: MediaItem = {
      id: `med-${Date.now()}`,
      name: newName || (isVideo ? "Video đính kèm" : "Hình ảnh bên ngoài"),
      url: newUrl,
      type: isVideo ? "video" : "image",
      mimeType: isVideo ? "video/mp4" : "image/jpeg",
      sizeBytes: 0,
      altText: newAlt || newName || "Media Lạc's Beauty Center",
      createdAt: new Date().toISOString(),
      isExternal: true,
      storageProvider: 'external'
    };

    await saveMediaItemToDB(item);
    await loadMedia();
    showToast("Đã thêm liên kết media vào thư viện!");
    setShowAddUrlModal(false);
    setNewUrl("");
    setNewName("");
    setNewAlt("");
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteMediaItemFromDB(deleteConfirmId);
    if (selectedItem?.id === deleteConfirmId) {
      setSelectedItem(null);
    }
    setDeleteConfirmId(null);
    await loadMedia();
    showToast("Đã xóa tệp khỏi thư viện media!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Đã sao chép URL vào bộ nhớ đệm!");
  };

  const filteredItems = mediaList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-700" />
            <span>Thư viện Media & Tối ưu hóa Ảnh WebP</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống tự động nén ảnh raster sang định dạng <strong>WebP</strong> sắc nét, tối ưu dung lượng và đồng bộ lên Neon PostgreSQL / Cloud Storage để toàn bộ khách hàng trên mọi thiết bị đều xem được.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <label className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition ${
            isUploading ? 'bg-neutral-400 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-800 cursor-pointer'
          }`}>
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Đang nén & tải lên...' : 'Tải ảnh từ máy (WebP)'}</span>
            <input
              type="file"
              multiple
              disabled={isUploading}
              accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => setShowAddUrlModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm URL ngoài</span>
          </button>
        </div>
      </div>

      {/* Real-time Upload Progress Dashboard */}
      {isUploading && uploadProgress && (
        <div className="bg-white p-5 border border-emerald-300 rounded-2xl shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-800">
              <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Đang xử lý ({uploadProgress.currentIndex}/{uploadProgress.totalFiles}): {uploadProgress.fileName}</span>
            </div>
            <span className="font-mono text-emerald-700 font-bold text-sm">{uploadProgress.percent}%</span>
          </div>

          <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${uploadProgress.percent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span>{uploadProgress.message}</span>
            {uploadProgress.savingsPercent ? (
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                Tiết kiệm {uploadProgress.savingsPercent}% dung lượng
              </span>
            ) : null}
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Container: Media Grid + Inspector Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Media Browser (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls Bar: Search, Type Filter & View Mode */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm media theo tên..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600 transition"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Type Filter Buttons */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs">
                {(["all", "image", "video"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-lg font-medium capitalize transition ${
                      selectedType === type
                        ? "bg-white text-emerald-800 shadow-xs font-bold"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {type === "all" ? "Tất cả" : type === "image" ? "Hình ảnh" : "Video"}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-neutral-600">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === "grid" ? "bg-white text-emerald-700 shadow-xs" : "hover:text-neutral-900"
                  }`}
                  title="Chế độ lưới"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === "list" ? "bg-white text-emerald-700 shadow-xs" : "hover:text-neutral-900"
                  }`}
                  title="Chế độ danh sách"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Media Items Container */}
          {isLoading ? (
            <div className="bg-white p-12 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
              Đang tải danh sách media từ Neon DB...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-400 space-y-2">
              <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto" />
              <p>Không tìm thấy tệp media nào phù hợp với bộ lọc.</p>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid Mode */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col ${
                      isSelected
                        ? "border-emerald-600 shadow-md ring-2 ring-emerald-600/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="aspect-square bg-neutral-100 overflow-hidden flex items-center justify-center relative">
                      {item.type === "video" ? (
                        <div className="flex flex-col items-center text-neutral-400">
                          <Film className="w-8 h-8" />
                          <span className="text-[10px] font-bold mt-1">MP4</span>
                        </div>
                      ) : (
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.altText || item.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/60 text-white backdrop-blur-xs">
                          {item.mimeType.includes("webp") ? "WEBP" : item.mimeType.includes("svg") ? "SVG" : "IMG"}
                        </span>
                      </div>

                      {item.savingsPercent ? (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white shadow-xs">
                          -{item.savingsPercent}%
                        </div>
                      ) : null}

                      {/* File Size Badge */}
                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/60 text-white backdrop-blur-xs">
                        {formatFileSize(item.sizeBytes)}
                      </div>
                    </div>

                    <div className="p-2.5 text-[11px] font-medium text-neutral-800 truncate border-t border-neutral-100 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-600 transition"
                        title="Xóa tệp"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Mode */
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 flex items-center justify-between gap-4 cursor-pointer text-xs transition ${
                      isSelected ? "bg-emerald-50/60 font-semibold text-emerald-950" : "hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center border border-neutral-200">
                        {item.type === "video" ? (
                          <Film className="w-5 h-5 text-neutral-400" />
                        ) : (
                          <img src={item.thumbnailUrl || item.url} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate text-neutral-900">{item.name}</div>
                        <div className="text-[11px] text-neutral-400 font-normal truncate mt-0.5">
                          {item.altText || "Chưa có mô tả alt"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 text-neutral-500 text-[11px]">
                      <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded text-[10px] font-bold text-neutral-700">
                        {item.mimeType.split("/")[1]?.toUpperCase() || "FILE"}
                      </span>
                      <span>{formatFileSize(item.sizeBytes)}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(item.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-neutral-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Media Details Inspector (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs sticky top-24 space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Thông số chi tiết tệp</span>
            </h3>

            {selectedItem ? (
              <div className="space-y-4 text-xs">
                {/* Media Preview Box */}
                <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-200 relative group">
                  {selectedItem.type === "video" ? (
                    <video src={selectedItem.url} controls className="max-h-full max-w-full" />
                  ) : (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                    title="Mở tab mới"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Metadata Fields */}
                <div className="space-y-2 text-neutral-600">
                  <div>
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Tên tệp:</span>
                    <span className="font-semibold text-neutral-900 text-sm break-all">{selectedItem.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
                    <div>
                      <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Định dạng:</span>
                      <span className="font-mono text-[11px] font-bold text-neutral-800 uppercase">{selectedItem.mimeType}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Dung lượng tối ưu:</span>
                      <span className="font-bold text-emerald-700">{formatFileSize(selectedItem.sizeBytes)}</span>
                    </div>
                  </div>

                  {selectedItem.savingsPercent ? (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Đã nén tối ưu: <strong>Giảm {selectedItem.savingsPercent}%</strong> (từ {formatFileSize(selectedItem.originalSizeBytes || 0)})
                      </span>
                    </div>
                  ) : null}

                  {selectedItem.width && selectedItem.height ? (
                    <div className="pt-1 border-t border-neutral-100">
                      <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Kích thước phân giải:</span>
                      <span className="font-medium text-neutral-800">{selectedItem.width} × {selectedItem.height} px</span>
                    </div>
                  ) : null}

                  <div className="pt-1 border-t border-neutral-100">
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Vị trí lưu trữ:</span>
                    <span className="font-medium text-neutral-800">
                      {selectedItem.storageProvider === 'vercel-blob'
                        ? 'Vercel Blob Object Storage (CDN)'
                        : selectedItem.isExternal
                        ? 'URL Ngoài (CDN)'
                        : 'Neon PostgreSQL & Cache Cục bộ'}
                    </span>
                  </div>

                  <div className="pt-1 border-t border-neutral-100">
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Mô tả Alt Text:</span>
                    <span className="font-medium text-neutral-800">{selectedItem.altText || "(Chưa có)"}</span>
                  </div>

                  <div className="pt-1 border-t border-neutral-100">
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block mb-1">Đường dẫn tệp (URL):</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        readOnly
                        value={selectedItem.url}
                        className="w-full px-2 py-1 text-[11px] bg-neutral-100 border border-neutral-300 rounded-lg font-mono truncate"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedItem.url)}
                        className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg shrink-0 transition"
                        title="Sao chép URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(selectedItem.url)}
                    className="flex-1 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(selectedItem.id)}
                    className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition"
                    title="Xóa tệp này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-neutral-400">
                Bấm vào bất kỳ tệp ảnh hoặc video nào để xem trước và kiểm tra thông số kỹ thuật.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add External URL Modal */}
      {showAddUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200">
            <form onSubmit={handleAddExternalUrl}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Thêm Media từ Liên kết ngoài
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Nhập đường dẫn trực tiếp của hình ảnh hoặc video trên web.
                </p>
              </div>

              <div className="p-5 space-y-3 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Đường dẫn URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/... hoặc .mp4"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên đặt cho tệp
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    placeholder="Ví dụ: Banner Khuyến mãi Mùa hè"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Alt Text (Mô tả SEO)
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Ví dụ: Hình ảnh khách hàng soi da đa tầng"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Loại tệp
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                  >
                    <option value="image">Hình ảnh (JPG, PNG, WebP)</option>
                    <option value="video">Video (MP4, Stream)</option>
                  </select>
                </div>
              </div>

              <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddUrlModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu liên kết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteConfirmId)}
        onCancel={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Xóa tệp khỏi kho lưu trữ?"
        message="Hành động này sẽ xóa tệp media khỏi hệ thống lưu trữ và cơ sở dữ liệu."
        confirmLabel="Xóa tệp ngay"
        type="danger"
      />
    </div>
  );
};
