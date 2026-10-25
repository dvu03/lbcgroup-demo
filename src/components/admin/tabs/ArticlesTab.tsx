import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Calendar,
  User,
  Star,
  Eye,
  Clock
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { ArticleItem } from "../../../data/articles";
import { RichTextEditor } from "../RichTextEditor";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { ConfirmationModal } from "../ConfirmationModal";

export const ArticlesTab: React.FC = () => {
  const { articles, saveArticle, deleteArticle, duplicateArticle, doctors } = useDemoData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNew = () => {
    const today = new Date().toLocaleDateString("vi-VN");
    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      title: "Tiêu đề bài viết y khoa mới",
      slug: `bai-viet-moi-${Date.now()}`,
      category: "cham-soc-da",
      categoryName: "Chăm sóc da",
      summary: "Tóm tắt ngắn gọn về kiến thức da liễu hoặc thông tin phòng khám.",
      author: "Ban Biên tập Y khoa LBC",
      consultingDoctor: doctors[0]?.formalTitle || "ThS.BS. Lạc Kim Ngân",
      publishedDate: today,
      readTime: "5 phút đọc",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      contentMarkdown: "## 1. Giới thiệu vấn đề\n\nNội dung bài viết chuyên môn y khoa...",
      tableOfContents: [{ id: "gioi-thieu", title: "1. Giới thiệu vấn đề", level: 2 }],
      isFeatured: false,
      status: "published",
      isVisible: true
    };
    setEditingArticle(newArt);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setIsSaving(true);
    const res = await saveArticle(editingArticle);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu bài viết: "${editingArticle.title}"!`);
      setEditingArticle(null);
    } else {
      alert("Lỗi khi lưu bài viết: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Tin tức & Kiến thức Y khoa</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Biên tập bài viết chuyên môn có tham vấn bác sĩ và tin tức hoạt động phòng khám. Quản lý trạng thái xuất bản, bài viết nổi bật và mục lục tự động.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài mới</span>
          </button>

          <Link
            to="/tin-tuc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Trang Tin tức</span>
          </Link>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tiêu đề bài viết..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
            >
              <option value="all">Tất cả danh mục ({articles.length})</option>
              <option value="cham-soc-da">Chăm sóc da</option>
              <option value="hoat-dong">Hoạt động phòng khám</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Hiển thị <span className="font-bold text-neutral-800">{filteredArticles.length}</span> bài viết
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="p-4 hover:bg-neutral-50/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start md:items-center gap-4 min-w-0">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-20 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                />

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {art.categoryName}
                    </span>
                    {art.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Nổi bật</span>
                      </span>
                    )}
                    <span className="text-[11px] text-neutral-400 font-mono">ID: {art.id}</span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 font-heading line-clamp-1">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {art.summary}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-neutral-400 pt-0.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.publishedDate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                    {art.consultingDoctor && (
                      <span className="text-emerald-800 font-medium">
                        {art.consultingDoctor}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <Link
                  to={`/tin-tuc/${art.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-800 hover:bg-neutral-100 transition"
                  title="Xem bài viết trên website"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => duplicateArticle(art.id)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-purple-700 hover:bg-purple-50 transition"
                  title="Nhân bản bài viết"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingArticle({ ...art })}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa bài viết"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(art.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Xóa bài viết"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Article Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveSubmit}>
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    Chỉnh sửa Bài viết: {editingArticle.title}
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">Slug: /{editingArticle.slug}</span>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề bài viết
                  </label>
                  <input
                    type="text"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-heading"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Danh mục
                    </label>
                    <select
                      value={editingArticle.category}
                      onChange={(e) => {
                        const val = e.target.value as "cham-soc-da" | "hoat-dong";
                        setEditingArticle({
                          ...editingArticle,
                          category: val,
                          categoryName: val === "cham-soc-da" ? "Chăm sóc da" : "Hoạt động"
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                    >
                      <option value="cham-soc-da">Chăm sóc da</option>
                      <option value="hoat-dong">Hoạt động phòng khám</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Ngày đăng
                    </label>
                    <input
                      type="text"
                      value={editingArticle.publishedDate}
                      onChange={(e) => setEditingArticle({ ...editingArticle, publishedDate: e.target.value })}
                      placeholder="15/10/2026"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Thời lượng đọc
                    </label>
                    <input
                      type="text"
                      value={editingArticle.readTime}
                      onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                      placeholder="5 phút đọc"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tác giả bài viết
                    </label>
                    <input
                      type="text"
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Bác sĩ tham vấn y khoa
                    </label>
                    <input
                      type="text"
                      value={editingArticle.consultingDoctor || ""}
                      onChange={(e) => setEditingArticle({ ...editingArticle, consultingDoctor: e.target.value })}
                      placeholder="ThS.BS. Lạc Kim Ngân (Tham vấn chuyên môn)"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Ảnh đại diện bài viết
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Chọn từ Thư viện Media</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={editingArticle.imageUrl}
                      alt="Art"
                      className="w-16 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                    />
                    <input
                      type="url"
                      value={editingArticle.imageUrl}
                      onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tóm tắt bài viết (Meta Description)
                  </label>
                  <textarea
                    rows={2}
                    value={editingArticle.summary}
                    onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden resize-none"
                  />
                </div>

                <RichTextEditor
                  label="Nội dung bài viết chi tiết (Markdown)"
                  value={editingArticle.contentMarkdown}
                  onChange={(val) => setEditingArticle({ ...editingArticle, contentMarkdown: val })}
                  rows={10}
                />

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                  <input
                    type="checkbox"
                    id="artFeaturedCheck"
                    checked={editingArticle.isFeatured}
                    onChange={(e) => setEditingArticle({ ...editingArticle, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="artFeaturedCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Ghim bài viết này lên đầu danh sách tin tức
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <span>Lưu bài viết</span>
                  )}
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
        title="Xóa bài viết?"
        message="Hành động này sẽ xóa bài viết khỏi chuyên mục tin tức y khoa trên website."
        confirmLabel="Xóa bài viết"
        cancelLabel="Hủy bỏ"
        onConfirm={async () => {
          if (deleteConfirmId) {
            const id = deleteConfirmId;
            setDeleteConfirmId(null);
            const res = await deleteArticle(id);
            if (res.success) {
              showToast("Đã xóa bài viết thành công!");
            } else {
              alert("Lỗi khi xóa bài viết: " + (res.error || "Không thể xóa"));
            }
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingArticle) {
            setEditingArticle({ ...editingArticle, imageUrl: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh đại diện bài viết"
      />
    </div>
  );
};
