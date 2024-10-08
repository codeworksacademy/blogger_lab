<script setup>
import { AppState } from '@/AppState.js';
import { blogsService } from '@/services/BlogsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const blog = computed(() => AppState.activeBlog)

const emit = defineEmits(['updated-blog'])

const editableBlogData = ref({
  body: blog.value.body,
  id: blog.value.id
})

async function updateBlog() {
  try {
    await blogsService.updateBlog(editableBlogData.value)
    Pop.success("Save Successful")
    emit('updated-blog')
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="updateBlog()">
    <div class="form-floating mb-3">
      <textarea v-model="editableBlogData.body" class="form-control" placeholder="Leave a comment here" required
        maxlength="10000" id="blog-body"></textarea>
      <label for="blog-body">Blog Body</label>
    </div>
    <div class="text-end">
      <button class="btn btn-warning" type="submit">Save</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
textarea {
  height: 80dvh !important;
  overflow-y: auto;
}
</style>