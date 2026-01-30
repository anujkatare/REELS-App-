export default function MediaPreview({ media, onClose }) {
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-9999 flex items-center justify-center"
      onClick={onClose}
    >
      {media.type === "image" && (
        <img
          src={media.url}
          className="max-h-full max-w-full object-contain"
        />
      )}

      {media.type === "video" && (
        <video
          src={media.url}
          controls
          autoPlay
          className="max-h-full max-w-full"
        />
      )}
    </div>
  );
}
