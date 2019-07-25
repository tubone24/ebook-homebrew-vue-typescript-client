import {shallowMount, createLocalVue, Wrapper} from '@vue/test-utils';
import Vuex from 'vuex';
import axios from 'axios';
import Fileupload from '@/components/FileUpload.vue';
import { fileUpload } from '@/store/FileUpload';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('axios');

describe('Fileupload.vue function unit test', () => {
    let store: any;
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                fileUpload: fileUpload
            },
        });
        wrapper = shallowMount(Fileupload, {store, localVue});
    });
    it('onFileChange not called callCreateImage', () => {
        const event = 'test';
        const mockcallCreateImage = jest.fn();
        wrapper.setMethods({callCreateImage: mockcallCreateImage});
        wrapper.vm.onFileChange(event);
        expect(mockcallCreateImage.mock.calls.length).toBe(0);
    });
    it('onFileChange called callCreateImage', () => {
        const event = {
            target: {files: ['test.png', 'test2.png']},
        } as any;
        const mockcallCreateImage = jest.fn();
        wrapper.setMethods({callCreateImage: mockcallCreateImage});
        wrapper.vm.onFileChange(event);
        expect(mockcallCreateImage.mock.calls[0][0]).toEqual(expect.arrayContaining(['test.png', 'test2.png']));
    });
    it('callCreateImage called createImage', () => {
        const arg = ['test.png', 'test2.png'] as any;
        const mockCreateImage = jest.fn();
        wrapper.setMethods({createImage: mockCreateImage});
        wrapper.vm.callCreateImage(arg);
        expect(mockCreateImage.mock.calls[0][0]).toBe('test.png');
    });
    it('removeImage', () => {
        const event = {
            target: {},
        } as any;
        wrapper.setData({image: 'test.png'});
        wrapper.vm.removeImage(event);
        expect(wrapper.vm._data.image).toBe('');
    });
    it('postImage', async () => {
        const resp = {data: {upload_id: 'testId'}};
        (axios.post as any).mockResolvedValue(resp);
        await wrapper.vm.postImage('test');
    });
    it('convertImages', async () => {
        const resp200 = {status: 200} as any;
        const resp404 = {status: 404} as any;
        expect(wrapper.vm.converted).toBe(false);
        (axios.post as any).mockResolvedValueOnce(resp404).mockResolvedValueOnce(resp200);
        await wrapper.vm.convertImages('test');
        expect(wrapper.vm.converted).toBe(true);
    });
});
