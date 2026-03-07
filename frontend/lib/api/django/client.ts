const API_BASE_URL = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/$/, "");

const DEFAULT_REVALIDATE = Number(process.env.REVALIDATE_SECONDS) || 3600;

async function get<T>(
  endpoint: string,
  options?: { revalidate?: number | false },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: options?.revalidate ?? DEFAULT_REVALIDATE,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const apiClient = { get };
