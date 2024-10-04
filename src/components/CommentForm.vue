<script setup>
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const editableCommentData = ref({
  body: '',
  blog: route.params.blogId
})

async function createComment() {
  try {
    await commentsService.createComment(editableCommentData.value)
    editableCommentData.value.body = ''
    Modal.getInstance('#commentModal').hide()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="createComment()">
    <div class="form-floating mb-3">
      <textarea v-model="editableCommentData.body" class="form-control" placeholder="Leave a comment here" required
        maxlength="500" id="comment-body"></textarea>
      <label for="comment-body">Comment Body</label>
    </div>
    <div class="text-end">
      <button class="btn btn-warning" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>