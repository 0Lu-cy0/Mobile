import { Storage, Client } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // API Endpoint của Appwrite
  projectId: "67c65928000d10b4ef02", // ID của dự án Appwrite
  bucketId: "67c659a80034cc5c6ce4", // ID của Storage Bucket
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const storage = new Storage(client);

