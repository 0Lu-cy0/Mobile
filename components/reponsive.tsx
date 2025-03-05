import { Dimensions, PixelRatio } from "react-native";

// Lấy chiều rộng và chiều cao màn hình thực tế
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

// Kích thước thiết kế gốc trong Figma
const FIGMA_WIDTH = 428;
const FIGMA_HEIGHT = 926;

// Tính toán tỷ lệ màn hình dựa trên thiết kế
export let scaleWidth = SCREEN_WIDTH / FIGMA_WIDTH;
export let scaleHeight = SCREEN_HEIGHT / FIGMA_HEIGHT;

// Cập nhật kích thước khi màn hình xoay
Dimensions.addEventListener("change", ({ screen }) => {
    scaleWidth = screen.width / FIGMA_WIDTH;
    scaleHeight = screen.height / FIGMA_HEIGHT;
});

/**
 * Hàm điều chỉnh kích thước theo chiều rộng màn hình
 */
export const normalizeWidth = (size: number): number => Math.round(size * scaleWidth);

/**
 * Hàm điều chỉnh kích thước theo chiều cao màn hình
 */
export const normalizeHeight = (size: number): number => Math.round(size * scaleHeight);

/**
 * Hàm điều chỉnh kích thước linh hoạt (lấy trung bình nhân để phù hợp hơn)
 */
export const normalize = (size: number): number => Math.round(size * Math.sqrt(scaleWidth * scaleHeight));

/**
 * Hàm điều chỉnh vị trí X theo tỷ lệ màn hình
 */
export const normalizeX = (size: number): number => Math.round(size * scaleWidth);

/**
 * Hàm điều chỉnh vị trí Y theo tỷ lệ màn hình
 */
export const normalizeY = (size: number): number => Math.round(size * scaleHeight);

/**
 * Hàm điều chỉnh fontSize theo tỷ lệ màn hình & PixelRatio để tránh quá nhỏ hoặc quá to
 */
export const normalizeFontSize = (size: number): number => {
    const scale = Math.sqrt(scaleWidth * scaleHeight);
    return Math.round(PixelRatio.getFontScale() * size * scale);
};

export default {
    normalizeWidth,
    normalizeHeight,
    normalize,
    normalizeX,
    normalizeY,
    normalizeFontSize,
    scaleWidth,
    scaleHeight,
};
