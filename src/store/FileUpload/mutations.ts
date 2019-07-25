import { MutationTree } from 'vuex';
import { FileUploadState } from '@/store/types';

const mutations: MutationTree<FileUploadState> = {
    addImage: (state, payload: string) => {
        state.images.push(payload);
    },
    clearImages: (state) => {
        state.images = [];
    },
    setContentType: (state, payload: string) => {
        state.contentType = payload;
    },
    setUploadId: (state, payload: string) => {
        state.uploadId = payload;
    },
};

export default mutations;
