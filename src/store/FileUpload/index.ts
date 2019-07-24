import { Module } from 'vuex';
import {FileUploadState, RootState} from '@/store/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: FileUploadState = {
    images: [],
    contentType: '',
    uploadId: '',
};

export const fileUpload: Module<FileUploadState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
