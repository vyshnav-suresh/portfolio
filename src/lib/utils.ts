import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getGradientColors() {
  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-blue-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function isMacOS() {
  if (typeof window === "undefined") return false;
  return navigator.userAgent.includes("Mac");
}

export function getOS() {
  if (typeof window === "undefined") return null;
  
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  
  if (macosPlatforms.indexOf(platform) !== -1) return 'macOS';
  if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
  if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
  if (/Android/.test(userAgent)) return 'Android';
  if (/Linux/.test(platform)) return 'Linux';
  
  return 'Unknown';
}

export function isMobile() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
}

export function isIOS() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function isSafari() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(userAgent);
}

export function isChrome() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /Chrome/.test(userAgent) && !/Edge|Edg|OPR|Opera/.test(userAgent);
}

export function isFirefox() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /Firefox/.test(userAgent);
}

export function isEdge() {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /Edg/.test(userAgent);
}
