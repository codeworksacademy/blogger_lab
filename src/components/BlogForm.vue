<script setup>
import { AppState } from '@/AppState.js';
import { blogsService } from '@/services/BlogsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const blog = computed(() => AppState.activeBlog)

const editableBlogData = ref({
  id: '',
  title: '',
  imgUrl: '',
  tags: [],
  published: true
})

watch(blog, () => {
  editableBlogData.value = { ...blog.value }
})

const tag = ref('')

function addTag() {
  editableBlogData.value.tags.push(tag.value.toLowerCase())
  tag.value = ''
}

function removeTag(index) {
  editableBlogData.value.tags.splice(index, 1)
}

async function createBlog() {
  try {
    const blog = await blogsService.createBlog(editableBlogData.value)
    Modal.getInstance('#blog-modal').hide()
    router.push({ name: 'Blog Details', params: { blogId: blog.id } })
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
async function updateBlog() {
  try {
    await blogsService.updateBlog(editableBlogData.value)
    Modal.getInstance('#blog-modal').hide()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

function handleSubmit() {
  editableBlogData.value.id ? updateBlog() : createBlog()
}
</script>


<template>
  <form id="blog-form" @submit.prevent="handleSubmit()">
    <div class="form-floating mb-3">
      <input v-model="editableBlogData.title" type="text" class="form-control" id="blog-title"
        placeholder="Blog blog-Title..." required maxlength="100">
      <label for="blog-title">Blog Title</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableBlogData.imgUrl" type="url" class="form-control" id="blog-img-url"
        placeholder="Blog ImgUrl..." maxlength="500">
      <label for="blog-img-url">Blog ImgUrl</label>
    </div>
    <div v-if="editableBlogData.imgUrl" class="mb-3">
      <p>Image Preview</p>
      <img :src="editableBlogData.imgUrl" alt="Your blog image" class="w-100">
    </div>
    <div class="mb-3 form-check">
      <input v-model="editableBlogData.published" type="checkbox" class="form-check-input" id="blog-published">
      <label class="form-check-label" for="blog-published">Publish this blog?</label>
    </div>
  </form>
  <form @submit.prevent="addTag()" id="tag-form">
    <div class="input-group mb-3">
      <input v-model="tag" type="text" class="form-control" placeholder="Add a tag to your blog"
        aria-label="Add a tag to your blog" aria-describedby="tags" maxlength="50" required>
      <button :disabled="editableBlogData.tags.includes(tag.toLowerCase())" class="btn btn-outline-secondary"
        type="submit" form="tag-form" title="Add tag">
        <i class="mdi mdi-tag-plus"></i>
      </button>
    </div>
  </form>
  <div class="d-flex flex-wrap gap-2 mb-3">
    <span v-for="(tag, index) in editableBlogData.tags" :key="tag" @click="removeTag(index)"
      class="bg-light px-1 border border-1 border-dark tag" role="button" :title="`Remove '${tag}' from tags`">
      <i class="mdi mdi-tag-remove"></i>
      {{ tag }}
    </span>
  </div>
  <div class="text-end">
    <button class="btn btn-warning" type="submit" form="blog-form">Submit</button>
  </div>
</template>


<style lang="scss" scoped>
.tag:hover>.mdi-tag-remove {
  color: var(--bs-danger)
}
</style>