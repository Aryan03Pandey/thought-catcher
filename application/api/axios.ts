import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

// ==============================
// 🔧 Configuration
// ==============================
const API_BASE_URL = "http://192.168.0.106:4000/api/v1"; 

// ==============================
// 🔒 Token Keys
// ==============================
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// ==============================
// 🧱 Type Definitions
// ==============================
interface DecodedToken {
  exp: number; // expiration time (seconds)
  iat: number; // issued at (seconds)
  [key: string]: any;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

// ==============================
// 📦 Token Storage Helpers
// ==============================
export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function saveTokens(access: string, refresh?: string): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
  if (refresh) await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

// ==============================
// 🧭 Token Utilities
// ==============================
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post<RefreshResponse>(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    await saveTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", (error as Error).message);
    await clearTokens();
    return null;
  }
}

// ==============================
// ⚙️ Axios Instance
// ==============================
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ==============================
// 📡 Request Interceptor
// ==============================
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getAccessToken();

    if (token && !isTokenExpired(token)) {
      // Axios headers are typed strictly, so mutate like this:
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as any;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ==============================
// 🚨 Response Interceptor
// ==============================
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 (Unauthorized) by attempting refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };
        //TODO: save the new refresh token in secure store
        return api(originalRequest); // retry the request
      } else {
        await clearTokens();
        // TODO: optionally navigate to login screen
      }
    }

    return Promise.reject(error);
  }
);

export default api;