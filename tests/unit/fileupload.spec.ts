import {shallowMount, mount, Wrapper} from '@vue/test-utils';
import axios from 'axios';
import Fileupload from '@/components/FileUpload.vue';

jest.mock('axios');

describe('Fileupload.vue function unit test', () => {
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        wrapper = shallowMount(Fileupload);
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
        expect(wrapper.vm.uploadId).toBe('testId');
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
describe('Fileupload.vue event', () => {
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        wrapper = shallowMount(Fileupload);
    });
    it('file selector', () => {
        expect(wrapper.find('#selected-images').exists()).toBe(false);
        expect(wrapper.find('#remove-image').exists()).toBe(false);
        const imageB64 = 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAGFElEQVR4nM2Y+W8bVRDHZ' +
            '96xa3ttJ61zN0lJCbSiKkdVVUgIfgIk+GeBH5BACH7iKFfLVYLahJSQo07tuL539703ww8bCoXEu+tElPnNkv' +
            'ftZ2fefOfAz7eH8P8z8aQBjrZTwGIAPvkpj5sa+0kGAGaBKAQmv4mZmQEAEPGJYDGDlKilHMY2GlpmUEr4Wnha' +
            'YBx5BwDwNh042Axg1bYGZibdxu7jX5oHDMrKUq+qlULC7XSwlQwGXgMYCwx8xi+w7yZyAxKYmdg3vtss9WLt' +
            'UpiiAxMxI4YAUoFvTgdXFqaXJ4pS4GRIcjpudzeImYhxFe/7Ld6cVBQRMltAgSUCjUgABhLd35vr++0F2rBS89' +
            'MrcxViNg4EpnRcmAxgxRYKMhBZPcOBp4Wj5ge/SHJBETwPQnAO43+TqO/eq76yuW5icALjctIljWIzKyV7Ifmx82D' +
            'nUa/2Q6ziAIiAGAY20pRv3518fxsOSNZJqzkPrV60fs3tg66kZKoZA7BE4jGEQC8fX35wnwlC1mm0xGBmD++udPq' +
            'RUFBaZVPhIlZSYEIH93cbnRCrQSnuTr9BcTsa/n9RnPvYFD0lSNOPfTfxsxKiDC2n/9UR0gPYgoWM2glHrTDb+80' +
            'PC2Jxi8zyedtPejtNfupDkv1FgvEGz/Xw9jKk1YUQEDraLvRlwJ5ZCEdhcXMvlbrO52NvY7vKRojeP84EAAAugPD' +
            'kBLIUViIGFv37d0HAuEUu4TD0j4eFjN7Wm7e79ZbA0/JE3sK4E8PTQQepn3lCG8hM9/dbgPgaTmKmD0lztUCRzw6H' +
            '4/FEgL7oW20h0riOJLwL0PE2NJCLZg5UzSWRufP0VjMIBBi42JLWWQmkzELhJdWpzDDTT0aCxGIoeBJX0tmPjlX4qqV' +
            '+erybDk2LrUDOzaIjigo6KXpsnF04h4YAIAB5GEOniATEdASX7lw1tfy5IoFwIjQHxoiznIpjsdCMNbNTBZfXJ0KY5' +
            'dFbEYaMkPBU0JgFgUcJacCMTLu2rPTSzPlMM7awR0NBcDMtaovMKXspGPBnyn5xtXFakkbl5LVo84BlgLnawFximJl' +
            'wkIE46ga6LeuLyuJROMwIYBzPBF4s5NF6zjLt6X3W0koF2qlV6/MG5ee20dgIRpHSzPlUkG5bF+Wqc8UiMPIXn7q7KWl' +
            'M5GxeS8ZAyspVhcmKK3m5MMCAEB0jl5+brbk62QYzPwcxJbmzhTna6U48+3MipWM8JOB9/yFs6GxeUKJzPDc+TNKiuy1' +
            'Nd8AExl39Znp1YWJMM5EJhCJuFrST81VjM0hMflmGAYA4LeuL6/MV2Obfv0j4/qheXphouTrXHNAvmE/SfVSQVYDj4hH' +
            'dHNJBbx2cXqy7K/MVfKmcO4dBCJax+1eNEKvEdEYtzhXee3KvHVkbO6imnsbiAhhbA+6sZSjqhsze0pExg0iO4YGZ8Xiw' +
            '2UfBAV17363M4ilECOohMDu0GglSr6SiPxoUXhaWMmBWomipxBhfadzY21fSYTjX8MMUopmJ/rk1u6v97uhcb6WvqdEZr5' +
            'RqxFiFoielkRUbw03djtb+72DboQIEjPNHZFxArFS0vNnS+dnK+emgmpJA0BsKTk8H1ayWfS1jIz7da+ztvVwt9k3lpQUKs' +
            '/QmKSFI7aOgKFc1IvT5dVz1cWpcsGTsSVHR+/ijsBKJkTr+M72wx82mvsPQ0TQSiTvGK9RTdTBEVlLiDhVLVxcnry4NFkp6s' +
            'g45n+uMB/DSrorT8t79e6Xa/u7zb4UqJWEcWmO4WPr2DqaCLwXnq49v1IDAEePNTx/YTGzktISfXG7/uNmEwA8Jcd2TxpcM' +
            'itQbGhlrvLmtUVPS/e3VuwwE4nZU7IziN/9dPPWekMroZWgfEmdwxK5kYhBQW3e7374zTY8HkcBh9InG53wnU83661hqa' +
            'CYR6T/6cEBOOJECG/effD3EUsAgBAYxu6Dr3/vDY3vnWi3NoY5Yl/L7zaaB91Iy0OJFkn4bqzVG+3wv2dKTAocRHZtq/Wo' +
            'JxO+lrvN/tpvreITYoLDbBPru51BZJPJWyDi7Xut05rox8QCUBLbvajeGiopmOEPMVdhsiuhIicAAAAASUVORK5CYII=';
        wrapper.setData({image: imageB64});
        wrapper.setData({images: [imageB64]});
        expect(wrapper.find('#selected-images').exists()).toBe(true);
        expect(wrapper.find('#remove-image').exists()).toBe(true);
        const selectFormatOptions = wrapper.find('#format-select').findAll('option');
        selectFormatOptions.at(1).setSelected();
        expect(wrapper.find('#post-image').exists()).toBe(true);
    });
});
