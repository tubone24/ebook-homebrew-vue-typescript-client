export interface RootState {
    version: string;
}

export interface FileUploadState {
    images: string[];
    contentType: string;
    uploadId: string;
}
