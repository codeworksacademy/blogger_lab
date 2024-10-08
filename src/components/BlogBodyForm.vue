<script setup>
import { AppState } from '@/AppState.js';
import { blogsService } from '@/services/BlogsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const blog = computed(() => AppState.activeBlog)

const emit = defineEmits(['blog-edit-completed'])

const editableBlogData = ref({
  body: blog.value.body,
  id: blog.value.id
})

async function updateBlog() {
  try {
    await blogsService.updateBlog(editableBlogData.value)
    Pop.success("Save Successful")
    emit('blog-edit-completed')
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}

async function cancelUpdate() {
  if (editableBlogData.value.body == blog.value.body) {
    emit('blog-edit-completed')
    return
  }

  const wantsToDiscard = await Pop.confirm("Are you sure that you want to discard the changes that you've made?")

  if (!wantsToDiscard) return

  editableBlogData.value.body = blog.value.body
  emit('blog-edit-completed')
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
      <button @click="cancelUpdate()" class="btn btn-success me-3" type="button">Cancel</button>
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