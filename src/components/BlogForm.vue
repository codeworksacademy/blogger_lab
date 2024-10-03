<script setup>
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';

const editableBlogData = ref({
  title: '',
  body: '',
  imgUrl: '',
  tags: [],
  published: true
})

async function createBlog() {
  try {
    Modal.getInstance('#blogModal').hide()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="createBlog()">

    <div class="text-end">
      <button class="btn btn-warning" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>