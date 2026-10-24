import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Search,
  Filter,
  Trash2,
  Copy,
  ExternalLink,
  Film,
  CheckCircle2,
  HardDrive,
  FileText,
  Eye,
  Info,
  Grid,
  List
} from "lucide-react";
import {
  MediaItem,
  getAllMediaFromDB,
  saveMediaItemToDB,
  deleteMediaItemFromDB,
  fileToMediaItem
} from "../../../utils/mediaStorage";
import { ConfirmationModal } from "../ConfirmationModal";

export const MediaLibraryTab: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

    for (let i = 0; i < files.length; i++) {
      try {
        const item = await fileToMediaItem(files[i]);
        await saveMediaItemToDB(item);
      } catch (err: any) {
        alert(err.message || "Lỗi tải file");
      }
    }

    await loadMedia();
    showToast(`Đã tải lên ${files.length} tệp thành công vào IndexedDB!`);
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
      isExternal: true
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

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "URL liên kết ngoài";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-700" />
            <span>Thư viện Media & Quản lý Tệp Cục bộ</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hỗ trợ tải trực tiếp ảnh (JPG, PNG, WebP) và video (MP4) từ máy tính lưu vào IndexedDB cục bộ của trình duyệt. Tệp được lưu giữ vĩnh viễn không bị mất khi tải lại trang và không bị giới hạn 5MB của LocalStorage.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <label className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Tải tệp từ máy tính</span>
            <input
              type="file"
              multiple
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

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên file, alt text..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
            >
              <option value="all">Tất cả định dạng ({mediaList.length})</option>
              <option value="image">Hình ảnh</option>
              <option value="video">Video</option>
              <option value="icon">Biểu tượng (Icon)</option>
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition ${
              viewMode === "grid" ? "bg-white text-emerald-800 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
            title="Dạng lưới ảnh"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition ${
              viewMode === "list" ? "bg-white text-emerald-800 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
            title="Dạng danh sách file"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Media Grid / List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Gallery List / Grid */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="py-20 text-center text-xs text-neutral-400 bg-white rounded-2xl border border-neutral-200">
              Đang tải danh sách media từ IndexedDB...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-16 text-center text-xs text-neutral-400 bg-white rounded-2xl border border-neutral-200 space-y-2">
              <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto" />
              <p>Không tìm thấy tệp media nào phù hợp.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isVideo = item.type === "video";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all aspect-square bg-neutral-900 ${
                      isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-600/40 shadow-md"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {isVideo ? (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-950 text-white">
                        <Film className="w-8 h-8 text-neutral-400 group-hover:text-emerald-400 transition" />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.altText || item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-white">
                      <p className="text-[10px] font-bold truncate">{item.name}</p>
                      <p className="text-[9px] text-neutral-300">{formatFileSize(item.sizeBytes)}</p>
                    </div>

                    {item.isExternal && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/60 text-white">
                        URL
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-neutral-600">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-800 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Tệp</th>
                    <th className="p-3">Định dạng</th>
                    <th className="p-3">Dung lượng</th>
                    <th className="p-3">Kích thước</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`cursor-pointer transition hover:bg-neutral-50 ${
                        selectedItem?.id === item.id ? "bg-emerald-50/60" : ""
                      }`}
                    >
                      <td className="p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                          {item.type === "video" ? (
                            <Film className="w-4 h-4 text-neutral-500 m-2" />
                          ) : (
                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-neutral-900 truncate max-w-xs">{item.name}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">{item.id}</div>
                        </div>
                      </td>
                      <td className="p-3">{item.mimeType}</td>
                      <td className="p-3">{formatFileSize(item.sizeBytes)}</td>
                      <td className="p-3">{item.width ? `${item.width}x${item.height}` : "Tự do"}</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(item.url);
                          }}
                          className="p-1 hover:text-emerald-700 text-neutral-400 mr-1"
                          title="Sao chép link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(item.id);
                          }}
                          className="p-1 hover:text-red-600 text-neutral-400"
                          title="Xóa tệp"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Selected Item Inspector */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4 sticky top-20">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-neutral-900 text-sm font-heading flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Thông tin tệp chi tiết</span>
            </h3>
            {selectedItem && (
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedItem.id)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa tệp</span>
              </button>
            )}
          </div>

          {selectedItem ? (
            <div className="space-y-4 text-xs">
              {/* Media Preview Box */}
              <div className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 aspect-video flex items-center justify-center">
                {selectedItem.type === "video" ? (
                  <video controls src={selectedItem.url} className="w-full h-full object-contain" />
                ) : (
                  <img src={selectedItem.url} alt={selectedItem.altText} className="w-full h-full object-contain" />
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Tên tệp:</span>
                  <span className="font-bold text-neutral-900 text-sm break-all">{selectedItem.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
                  <div>
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Loại MIME:</span>
                    <span className="font-medium text-neutral-800">{selectedItem.mimeType}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Dung lượng:</span>
                    <span className="font-medium text-neutral-800">{formatFileSize(selectedItem.sizeBytes)}</span>
                  </div>
                </div>

                {selectedItem.width && (
                  <div className="pt-1 border-t border-neutral-100">
                    <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Độ phân giải:</span>
                    <span className="font-medium text-neutral-800">{selectedItem.width} x {selectedItem.height} px</span>
                  </div>
                )}

                <div className="pt-1 border-t border-neutral-100">
                  <span className="text-neutral-400 uppercase text-[10px] font-semibold block">Văn bản thay thế (Alt):</span>
                  <span className="font-medium text-neutral-800">{selectedItem.altText || "(Chưa có alt text)"}</span>
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
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-neutral-400">
              Bấm vào bất kỳ tệp ảnh hoặc video nào để xem trước và kiểm tra thông số kỹ thuật.
            </div>
          )}
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

              <div className="px-5 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUrlModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu vào Thư viện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa tệp khỏi Media Library?"
        message="Hành động này sẽ xóa tệp media khỏi kho lưu trữ IndexedDB cục bộ."
        confirmLabel="Xóa tệp"
        cancelLabel="Hủy bỏ"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
