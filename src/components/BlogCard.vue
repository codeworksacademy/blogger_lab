<script setup>
import { Blog } from '@/models/Blog.js';
import ProfilePicture from './ProfilePicture.vue';

defineProps({
  blog: { type: Blog, required: true }
})
</script>


<template>
  <RouterLink :to="{ name: 'Blog Details', params: { blogId: blog.id } }" :title="`Read the ${blog.title} blog`">
    <div class="d-md-flex p-3 justify-content-between rounded border border-dark border-3 shadow">
      <div class="flex-grow-1">
        <RouterLink :to="{ name: 'Profile Details', params: { profileId: blog.creatorId } }"
          :title="`Go to ${blog.creator.name}'s profile page`">
          <div class="d-flex align-items-center gap-1 mb-1 creator-details selectable">
            <ProfilePicture width="3rem" :profile="blog.creator" />
            <span>{{ blog.creator.name }}</span>
          </div>
        </RouterLink>
        <div class="d-md-flex justify-content-between align-items-center mb-2">
          <div>
            <span class="fw-bold">
              {{ blog.title }}
            </span>
            <i v-if="!blog.published" class="mdi mdi-book-lock" title="This blog is not published"></i>
          </div>
          <div class="d-flex gap-1">
            <span v-for="tag in blog.tags" :key="tag" class="border border-1 border-dark px-1">
              <i class="mdi mdi-tag"></i>
              {{ tag }}
            </span>
          </div>
        </div>
        <p class="ellipsis">{{ blog.body }}</p>
        <time :datetime="blog.createdAt.toLocaleDateString()">{{ blog.createdAt.toLocaleDateString() }}</time>
      </div>
      <img v-if="blog.imgUrl" :src="blog.imgUrl" :alt="blog.title" class="blog-img rounded ms-md-3">
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.blog-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.ellipsis {
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

a,
.creator-details {
  width: fit-content;
}

@media screen and (min-width: 768px) {
  .blog-img {
    width: 20%;
  }
}
</style>