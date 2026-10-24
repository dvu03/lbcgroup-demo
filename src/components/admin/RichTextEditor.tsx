import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  Edit3
} from "lucide-react";
import { MediaLibraryModal } from "./MediaLibraryModal";

export interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  helperText?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = "Nhập nội dung biên tập...",
  rows = 8,
  helperText
}) => {
  const [viewMode, setViewMode] = useState<"write" | "preview">("write");
  const [showMediaModal, setShowMediaModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const replacement = `${before}${selected}${after}`;
    const nextVal = value.substring(0, start) + replacement + value.substring(end);
    onChange(nextVal);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 50);
  };

  const handleInsertMedia = (mediaItem: { url: string; alt?: string; title?: string }) => {
    const isVideo = mediaItem.url.endsWith(".mp4") || mediaItem.url.includes("youtube") || mediaItem.url.includes("youtu.be");
    if (isVideo) {
      insertText(`\n<video controls src="${mediaItem.url}" className="w-full rounded-xl my-4"></video>\n`);
    } else {
      insertText(`\n![${mediaItem.alt || mediaItem.title || "Hình ảnh"}](${mediaItem.url})\n`);
    }
  };

  const renderSimpleMarkdown = (text: string) => {
    if (!text.trim()) {
      return <p className="text-neutral-400 italic">Chưa có nội dung để xem trước...</p>;
    }

    const lines = text.split("\n");
    return (
      <div className="prose max-w-none text-neutral-800 text-sm leading-relaxed space-y-2">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return <h3 key={idx} className="text-base font-bold text-neutral-900 mt-3 mb-1">{line.replace("### ", "")}</h3>;
          }
          if (line.startsWith("## ")) {
            return <h2 key={idx} className="text-lg font-bold text-neutral-900 mt-4 mb-2">{line.replace("## ", "")}</h2>;
          }
          if (line.startsWith("# ")) {
            return <h1 key={idx} className="text-xl font-extrabold text-neutral-900 mt-5 mb-2">{line.replace("# ", "")}</h1>;
          }
          if (line.startsWith("> ")) {
            return (
              <blockquote key={idx} className="border-l-4 border-emerald-600 pl-3 py-1 bg-emerald-50/50 italic text-neutral-700 my-2 rounded-r">
                {line.replace("> ", "")}
              </blockquote>
            );
          }
          if (line.startsWith("- ") || line.startsWith("* ")) {
            return (
              <li key={idx} className="ml-5 list-disc text-neutral-700">
                {line.substring(2)}
              </li>
            );
          }
          // Markdown image regex
          const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            return (
              <figure key={idx} className="my-3">
                <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-xl max-h-72 object-cover border border-neutral-200" />
                {imgMatch[1] && <figcaption className="text-xs text-neutral-500 mt-1 italic">{imgMatch[1]}</figcaption>}
              </figure>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-2" />;
          }
          return <p key={idx} className="text-neutral-700">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            {label}
          </label>
          <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
            <button
              type="button"
              onClick={() => setViewMode("write")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition ${
                viewMode === "write"
                  ? "bg-white text-emerald-800 shadow-xs font-semibold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Soạn thảo
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition ${
                viewMode === "preview"
                  ? "bg-white text-emerald-800 shadow-xs font-semibold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Xem trước
            </button>
          </div>
        </div>
      )}

      <div className="border border-neutral-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600/30 focus-within:border-emerald-600 bg-white">
        {/* Editor Toolbar */}
        {viewMode === "write" && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-neutral-50 border-b border-neutral-200 text-neutral-600">
            <button
              type="button"
              onClick={() => insertText("## ", "", "Tiêu đề")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Heading 2"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("### ", "", "Tiêu đề con")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Heading 3"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-neutral-300 mx-1" />
            <button
              type="button"
              onClick={() => insertText("**", "**", "in đậm")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition font-bold"
              title="In đậm (Bold)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("*", "*", "in nghiêng")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition italic"
              title="In nghiêng (Italic)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-neutral-300 mx-1" />
            <button
              type="button"
              onClick={() => insertText("\n- ", "", "Mục danh sách")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Danh sách dấu chấm"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("\n1. ", "", "Mục đánh số")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Danh sách số"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("\n> ", "", "Trích dẫn")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Trích dẫn"
            >
              <Quote className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-neutral-300 mx-1" />
            <button
              type="button"
              onClick={() => insertText("[", "](https://example.com)", "Tên liên kết")}
              className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 hover:text-neutral-900 transition"
              title="Chèn liên kết"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowMediaModal(true)}
              className="flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-medium text-xs transition border border-emerald-200"
              title="Chèn ảnh / media từ thư viện"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Chèn Media</span>
            </button>
          </div>
        )}

        {viewMode === "write" ? (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-hidden font-mono resize-y"
          />
        ) : (
          <div className="p-4 bg-neutral-50/50 min-h-[160px] overflow-y-auto max-h-96">
            {renderSimpleMarkdown(value)}
          </div>
        )}
      </div>

      {helperText && <p className="text-xs text-neutral-500 mt-1">{helperText}</p>}

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        onSelectMedia={(media) => {
          handleInsertMedia(media);
          setShowMediaModal(false);
        }}
        title="Chọn ảnh hoặc video chèn vào nội dung"
      />
    </div>
  );
};
