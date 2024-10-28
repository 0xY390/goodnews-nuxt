<template>
  <div class="upload-image">
    <input
      class="input-file"
      type="file"
      accept="image/jpeg,image/png,image/gif,image/webp"
      @input="bannerChange"
    />
  </div>
</template>

<script setup>
import { uploadFile } from '@/api/base.js'

const fileList = inject('fileList', ref([]))
const formValue = inject('formValue', ref({}))
const uploadLoading = inject('uploadLoading', ref(false))

const onFileChange = async e => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('file', file)
  const fileRes = await uploadFile(formData)
  if (fileRes) {
    return Promise.resolve(fileRes)
  }
}

const bannerChange = async e => {
  try {
    uploadLoading.value = true
    await onFileChange(e).then(res => {
      fileList.value = [
        {
          id: res.id,
          url: res.url,
          status: 'finished'
        }
      ]
      formValue.value.formBranding.thumbnail_url = res.url
      formValue.value.formBranding.thumbnail_id = res.id
    })
  } finally {
    uploadLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.upload-image {
  width: 100%;
  height: 100%;
}

:deep(.arco-modal-header) {
  display: flex !important;
  justify-content: flex-end !important;
}
</style>
