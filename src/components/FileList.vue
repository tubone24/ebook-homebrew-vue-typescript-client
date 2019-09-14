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
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in uploadList">
                <th>{{ item.id }}</th>
                <th>{{ item.file_path }}</th>
                <th>{{ item.last_index }}</th>
                <th>{{ item.file_type }}</th>
                <th>{{ item.updated_at }}</th>
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
        private uploadList: Array<Map<string, string>> = [];

        private async created() {
            const res = await axios.get(backendURL + 'data/upload/list');
            if (res.status === 200) {
                this.uploadList = res.data.fileList;
            }
            console.log(JSON.stringify(this.uploadList));
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
        width: 100%;
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
</style>
