<template>
  <div class="sample">
    <img alt="ebook logo" src="../assets/logo.png">
      <FileUpload />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileUpload from '@/components/FileUpload.vue';

@Component({
    components: {
        FileUpload,
    },
})
export default class Sample extends Vue {}
</script>
