import React, { useState } from 'react';

interface BeforeAfterViewerProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterViewer: React.FC<BeforeAfterViewerProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Trước điều trị",
  afterLabel = "Sau liệu trình",
  className = "",
  aspectRatio = "aspect-[4/3]"
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl select-none group border border-slate-200/80 shadow-md ${className}`}>
      <div 
        className={`relative w-full ${aspectRatio} overflow-hidden cursor-ew-resize`}
        onMouseMove={(e) => isDragging && handleSliderMove(e)}
        onTouchMove={handleSliderMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onClick={handleSliderMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded bg-primary-700/80 backdrop-blur-sm text-white text-xs font-semibold shadow">
          {afterLabel}
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold shadow">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl pointer-events-none"
          style={{ left: `calc(${sliderPos}% - 2px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs">
            ⇄
          </div>
        </div>
      </div>
      
      {/* Range Input for accessibility & mobile touch slider */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">{beforeLabel}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-1/2 accent-primary-600 cursor-pointer"
          aria-label="So sánh trước sau"
        />
        <span className="font-medium text-primary-700">{afterLabel}</span>
      </div>
    </div>
  );
};
