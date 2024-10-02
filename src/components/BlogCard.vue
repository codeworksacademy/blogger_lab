<script setup>
import { Blog } from '@/models/Blog.js';

defineProps({
  blog: { type: Blog, required: true }
})
</script>


<template>
  <div class="d-md-flex p-3 justify-content-between rounded border border-dark border-3 shadow">
    <div class="d-flex  flex-column flex-grow-1">
      <RouterLink :to="{ name: 'Profile Details', params: { profileId: blog.creatorId } }"
        :title="`Go to ${blog.creator.name}'s profile page`">
        <div class="d-flex align-items-center gap-1 mb-1">
          <img :src="blog.creator.picture" :alt="`${blog.creator.name}'s profile picture'`" class="creator-img">
          <span class="text-dark">{{ blog.creator.name }}</span>
        </div>
      </RouterLink>
      <span class="fw-bold mb-1">{{ blog.title }}</span>
      <p class="ellipsis">{{ blog.body }}</p>
      <time :datetime="blog.createdAt.toLocaleDateString()">{{ blog.createdAt.toLocaleDateString() }}</time>
    </div>
    <img :src="blog.imgUrl" :alt="blog.title" class="blog-img rounded ms-md-3">
  </div>
</template>


<style lang="scss" scoped>
.creator-img {
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}

.blog-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.ellipsis {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (min-width: 768px) {
  .blog-img {
    width: 20%;
  }
}
</style>