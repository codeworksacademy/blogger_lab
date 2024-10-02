<script setup>
import { AppState } from '@/AppState.js';
import BlogCard from '@/components/BlogCard.vue';
import { blogsService } from '@/services/BlogsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const blogs = computed(() => AppState.blogs)

onMounted(() => {
  getBlogs()
})

async function getBlogs() {
  try {
    await blogsService.getBlogs()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div v-for="blog in blogs" :key="blog.id" class="col-12 mb-4">
        <BlogCard :blog="blog" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
