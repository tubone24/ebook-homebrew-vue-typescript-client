import {mount, shallowMount, Wrapper} from '@vue/test-utils';
import axios from 'axios';
import FileList from '@/components/FileList.vue';

jest.mock('axios');

describe('FileList.vue function unit test', () => {
    let wrapper: Wrapper<any>;

    it('updateFileList', async () => {
        const resp = {
            status: 200,
            data: {
                fileList: [
                    {
                        id: 1,
                        name: '/tmp/tmpaw0w7qp5/0.jpg',
                        file_path: '/tmp/tmpaw0w7qp5',
                        file_type: 'image/jpeg',
                        last_index: 0,
                        created_at: '2019-09-14 10:58:46',
                        updated_at: '2019-09-14 10:58:46',
                    },
                    {
                        id: 2,
                        name: '/tmp/tmp7ne162ol/30.jpg',
                        file_path: '/tmp/tmp7ne162ol',
                        file_type: 'image/jpeg',
                        last_index: 30,
                        created_at: '2019-09-14 10:58:46',
                        updated_at: '2019-09-14 10:58:46',
                    },
                    {
                        id: 3,
                        name: '/tmp/tmpsaw7tf0t/1.png',
                        file_path: '/tmp/tmpsaw7tf0t',
                        file_type: 'image/png',
                        last_index: 1,
                        created_at: '2019-09-14 10:58:46',
                        updated_at: '2019-09-14 10:58:46',
                    },
                ],
            },
        } as any;
        (axios.get as any).mockResolvedValue(resp);
        wrapper = shallowMount(FileList);
        await wrapper.vm.updateFileList();
        expect(wrapper.vm._data.uploadList).toBe(resp.data.fileList);
    });

    it('updateFileList400', async () => {
        const resp = {status: 400} as any;
        (axios.get as any).mockResolvedValue(resp);
        wrapper = shallowMount(FileList);
        await wrapper.vm.updateFileList();
        expect(wrapper.vm._data.uploadList).toEqual([]);
    });
});
