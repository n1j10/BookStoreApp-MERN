const API_BASE_URL = "http://localhost:5000";
const FALLBACK_IMAGE_URL = "https://picsum.photos/seed/book-fallback/400/600";

export const getImageSrc = (coverImage) => {
  if (!coverImage || typeof coverImage !== "string") {
    return FALLBACK_IMAGE_URL;
  }

  const trimmed = coverImage.trim();
  if (!trimmed) return FALLBACK_IMAGE_URL;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `${API_BASE_URL}/images/${trimmed}`;
};
