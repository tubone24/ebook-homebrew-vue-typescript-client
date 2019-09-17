<template>
    <div id="list">
        <table>
            <thead>
            <tr>
                <th class="id">ID</th>
                <th class="filepath">File Path</th>
                <th class="lastindex">Last Index</th>
                <th class="type">File Type</th>
                <th class="updated">Updated at</th>
                <th class="download">-</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in uploadList">
                <th>{{ item.id }}</th>
                <th>{{ item.file_path }}</th>
                <th>{{ item.last_index }}</th>
                <th>{{ item.file_type }}</th>
                <th>{{ item.updated_at }}</th>
                <button v-on:click="doDownload(item.file_path)">DL</button>
            </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import mixins from '../mixins/const';

    const backendURL = mixins.data().backendURL;
    @Component
    export default class FileList extends Vue {
        public uploadList: Array<Map<string, string>> = [];

        public async updateFileList(): Promise<void> {
            const res = await axios.get(backendURL + 'data/upload/list');
            if (res.status === 200) {
                this.uploadList = res.data.fileList;
            }
            console.log(JSON.stringify(this.uploadList));
        }

        public async doDownload(filePath: string): Promise<void> {
            const blob = await this.downloadPDF(filePath);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'result.pdf';
            link.click();
        }

        public async downloadPDF(filePath: string): Promise<Blob> {
            const options = {
                position: 'top-center',
                duration: 2000,
                fullWidth: true,
                type: 'error',
            } as any;
            const res = await axios.post(backendURL + 'convert/pdf/download', {
                uploadId: filePath,
            }, {responseType: 'blob'}).catch((err) => {
                    if (err.response.status === 404) {
                        this.$toasted.show('No File!!', options);
                        throw err;
                    } else {
                        this.$toasted.show('Error!!');
                        throw err;
                    }
                },
            );
            return new Blob([res.data], {type: 'application/pdf'});
        }

        private async created(): Promise<void> {
            await this.updateFileList();
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    #list {
        max-width: 640px;
        margin: 0 auto;
    }

    table {
        width: 110%;
        border-collapse: collapse;
    }

    thead th {
        border-bottom: 2px solid #65e44a; /*#d31c4a */
        color: #5fe460;
    }

    th,
    th {
        padding: 0 8px;
        line-height: 40px;
    }

    thead th.id {
        width: 50px;
    }

    thead th.state {
        width: 100px;
    }

    thead th.button {
        width: 60px;
    }

    tbody td.button, tbody td.state {
        text-align: center;
    }

    tbody tr td,
    tbody tr th {
        border-bottom: 1px solid #ccc;
        transition: all 0.4s;
    }

    tbody tr.done td,
    tbody tr.done th {
        background: #f8f8f8;
        color: #bbb;
    }

    tbody tr:hover td,
    tbody tr:hover th {
        background: #f4fbff;
    }

    button {
        border: none;
        border-radius: 20px;
        position: relative;
        top: 7px;
        line-height: 24px;
        padding: 0 8px;
        background: #0099e4;
        color: #fff;
        cursor: pointer;
    }
</style>
