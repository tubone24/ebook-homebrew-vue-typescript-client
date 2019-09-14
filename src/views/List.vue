<template>
  <div class="list">
      <h1>Ebook Homebrew Convert PDF List</h1>
    <img alt="ebook logo" src="../assets/logo.png">
      <FileList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileList from '@/components/FileList.vue';

@Component({
    components: {
        FileList,
    },
})
export default class Sample extends Vue {}
</script>
