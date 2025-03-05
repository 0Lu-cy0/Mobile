import * as DocumentPicker from "expo-document-picker";
import { storage, appwriteConfig } from './appWriteConfig'

export const uploadFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Chọn mọi loại file
    });

    if (result.canceled || !result.assets?.length) return;

    const fileUri = result.assets[0].uri;
    const fileName = result.assets[0].name || "upload";
    const fileType = result.assets[0].mimeType || "application/octet-stream";

    // Chuyển URI thành Blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: fileType });

    // Tải file lên Appwrite Storage
    const uploadResponse = await storage.createFile(
      appwriteConfig.bucketId,
      "unique()",
      file
    );

    console.log("File uploaded:", uploadResponse);
    return uploadResponse;
  } catch (error) {
    console.error("Upload error:", error);
  }
};
