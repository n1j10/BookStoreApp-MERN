const BASE = "https://book-store-app-mern-xi.vercel.app";

export const API_BASE_URL = BASE;

export const buildApiUrl = (path = "") => path?.trim() ? `${BASE}/${path.replace(/^\//, "")}` : BASE;

export const parseApiResponse = async (response, options = {}) => {
  const rawText = await response.text();
  let data = null;
  try { data = rawText ? JSON.parse(rawText) : null; } catch {}
  if (typeof data !== "object" || !data) data = null;

  return {
    ok: response.ok,
    status: response.status,
    data,
    rawText,
    message: data?.message || data?.error || "",
  };
};

export const apiFetch = (path, options = {}) => fetch(buildApiUrl(path), options);

