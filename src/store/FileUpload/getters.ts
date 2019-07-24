import { GetterTree } from 'vuex';
import { FileUploadState, RootState } from '@/store/types';

const getters: GetterTree<FileUploadState, RootState> = {
    getImages: (state: FileUploadState) => {
        return state.images;
    },
    getImagesLength: (state: FileUploadState) => {
        return state.images.length;
    },
    getLastImage: (state: FileUploadState) => {
        if (state.images.length < 1) {
            return '';
        } else {
            return state.images[state.images.length - 1];
        }
    },
    getContentType: (state: FileUploadState) => {
        return state.contentType;
    },
    getUploadId: (state: FileUploadState) => {
        return state.uploadId;
    },
};

export default getters;
