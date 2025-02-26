import { Dimensions } from "react-native";

// Lấy chiều rộng và chiều cao màn hình
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Tỷ lệ dựa trên kích thước màn hình thiết kế trong Figma (428x926)
const FIGMA_WIDTH = 428;
const FIGMA_HEIGHT = 926;

// Tính toán tỷ lệ màn hình cho chiều rộng và chiều cao
export const scaleWidth = SCREEN_WIDTH / FIGMA_WIDTH;
export const scaleHeight = SCREEN_HEIGHT / FIGMA_HEIGHT;

/**
 * Hàm điều chỉnh kích thước theo chiều rộng màn hình
 * @param size Kích thước gốc từ thiết kế
 * @returns Kích thước được điều chỉnh
 */
export const normalizeWidth = (size: number): number => Math.round(size * scaleWidth);

/**
 * Hàm điều chỉnh kích thước theo chiều cao màn hình
 * @param size Kích thước gốc từ thiết kế
 * @returns Kích thước được điều chỉnh
 */
export const normalizeHeight = (size: number): number => Math.round(size * scaleHeight);

/**
 * Hàm điều chỉnh kích thước linh hoạt dựa trên giá trị nhỏ hơn giữa chiều rộng và chiều cao
 * @param size Kích thước gốc từ thiết kế
 * @returns Kích thước được điều chỉnh
 */
export const normalize = (size: number): number => Math.round(size * Math.min(scaleWidth, scaleHeight));

/**
 * Hàm điều chỉnh vị trí X theo tỷ lệ màn hình
 * @param size Vị trí X gốc từ thiết kế
 * @returns Vị trí X được điều chỉnh
 */
export const normalizeX = (size: number): number => Math.round(size * scaleWidth);

/**
 * Hàm điều chỉnh vị trí Y theo tỷ lệ màn hình
 * @param size Vị trí Y gốc từ thiết kế
 * @returns Vị trí Y được điều chỉnh
 */
export const normalizeY = (size: number): number => Math.round(size * scaleHeight);

/**
 * Hàm điều chỉnh fontSize theo tỷ lệ màn hình
 * @param size Font size gốc từ thiết kế
 * @returns Font size được điều chỉnh
 */
export const normalizeFontSize = (size: number): number => Math.round(size * Math.min(scaleWidth, scaleHeight));

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
