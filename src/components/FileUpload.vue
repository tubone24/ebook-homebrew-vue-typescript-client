<template>
    <div class="FileUpload">
        <div>
            <select id="format-select" v-model="selected">
                <option disabled value="">Please select one</option>
                <option value="image/png">image/png</option>
                <option value="image/jpeg">image/jpeg</option>
                <option value="image/gif">image/gif</option>
            </select>
            <span id="selected-format">Image Format: {{ selected }}</span>
        </div>
        <div v-if="!image" id="select-not-yet-image">
            <h2>Select images</h2>
            <input id="file-choice" type="file" @change="onFileChange" multiple="multiple" accept="image/*">
        </div>
        <div v-else id="selected-images">
            <img :src="image"/>
            <button id="remove-image" class="btn btn-danger" @click="removeImage">Remove images</button>
            <div v-if="selected && images">
                <button id="post-image" class="btn btn-primary" @click="postImage">Post images</button>
            </div>
            <div v-if="uploadId">
                <span id="upload-id">UploadId: {{ uploadId }}</span>
            </div>
            <div v-if="uploadId">
                <div class="row">
                    <div class="col-sm-6">
                        <button id="convert-images" class="btn btn-info" @click="convertImages">Convert images</button>
                    </div>
                    <div v-if="converted" class="col-sm-6">
                        <button id="download-pdf-200" class="btn btn-success" @click="downloadPDF">Download PDF</button>
                    </div>
                    <div v-else class="col-sm-6">
                        <button id="download-pdf-404" class="btn btn-warning" @click="downloadPDF">Download PDF</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import mixins from '../mixins/const';

    const backendURL = mixins.data().backendURL;
    @Component
    export default class FileUpload extends Vue {
        private image: string = '';
        private images: string[] = [];
        private selected: string = '';
        private uploadId: string = '';
        private converted: boolean = false;

        public async onFileChange(e: any): Promise<void> {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            await this.callCreateImage(files);
        }

        public async callCreateImage(files: Blob[]): Promise<void> {
            for (const file of files) {
                await this.createImage(file);
            }
        }

        public async createImage(file: Blob): Promise<void> {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.image = e.target.result;
                this.images.push(e.target.result);
            };
            return new Promise((resolve, reject) => {
                reader.readAsDataURL(file);
                return resolve();
            });
        }

        public removeImage(e: any): void {
            this.image = '';
        }

        public async postImage(e: any): Promise<void> {
            const res = await axios.post(backendURL + 'data/upload', {
                contentType: this.selected,
                images: this.images,
            });
            this.uploadId = res.data.upload_id;
        }

        public async convertImages(e: any): Promise<void> {
            await axios.post(backendURL + 'convert/pdf', {
                contentType: this.selected,
                uploadId: this.uploadId,
            });
            let statusCode = 404;
            while (statusCode === 200) {
                const res = await axios.post(backendURL + 'convert/pdf/download', {
                    uploadId: this.uploadId,
                });
                statusCode = res.status;
            }
            this.converted = true;
        }

        public async downloadPDF(e: any): Promise<void> {
            const res = await axios.post(backendURL + 'convert/pdf/download', {
                uploadId: this.uploadId,
            }, {responseType: 'blob'});
            const blob = new Blob([res.data], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'result.pdf';
            link.click();
        }
    }
</script>

<style  scoped>
    img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
    button {
    }
</style>
