<script setup>
import { Blog } from '@/models/Blog.js';
import ProfilePicture from './ProfilePicture.vue';

defineProps({
  blog: { type: Blog, required: true }
})
</script>


<template>
  <RouterLink :to="{ name: 'Blog Details', params: { blogId: blog.id } }" :title="`Read the ${blog.title} blog`">
    <div class="d-md-flex p-3 justify-content-between rounded border border-dark border-3 shadow text-dark">
      <div class="d-flex flex-column flex-grow-1 ">
        <RouterLink :to="{ name: 'Profile Details', params: { profileId: blog.creatorId } }"
          :title="`Go to ${blog.creator.name}'s profile page`">
          <div class="d-flex align-items-center gap-1 mb-1 creator-details">
            <ProfilePicture width="3rem" :profile="blog.creator" />
            <span>{{ blog.creator.name }}</span>
          </div>
        </RouterLink>
        <span class="fw-bold mb-1">{{ blog.title }}</span>
        <p class="ellipsis">{{ blog.body }}</p>
        <time :datetime="blog.createdAt.toLocaleDateString()">{{ blog.createdAt.toLocaleDateString() }}</time>
      </div>
      <img :src="blog.imgUrl" :alt="blog.title" class="blog-img rounded ms-md-3">
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