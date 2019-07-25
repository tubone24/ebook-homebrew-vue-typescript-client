import { ActionTree } from 'vuex';
import { FileUploadState, RootState } from '@/store/types';

const actions: ActionTree<FileUploadState, RootState> = {
    addImage: async ({ commit }) => {
        commit('addImage');
    },
    clearImages: async ({ commit }) => {
        commit('clearImages');
    },
    setContentType: async ({ commit }) => {
        commit('setContentType');
    },
    setUploadId: async ({ commit }) => {
        commit('setUploadId');
    },
    setConverted: async ({ commit }) => {
        commit('setConverted');
    },
};

export default actions;
