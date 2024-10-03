<script setup>
import { Comment } from '@/models/Comment.js';
import ProfilePicture from './ProfilePicture.vue';

defineProps({
  comment: { type: Comment, required: true }
})
</script>


<template>
  <div class="rounded border border-dark border-3 px-5 py-3 d-md-flex gap-4">
    <div class="d-none d-md-block">
      <RouterLink :to="{ name: 'Profile Details', params: { profileId: comment.creatorId } }"
        :title="`Go to ${comment.creator.name}'s profile page`">
        <ProfilePicture width="12rem" :profile="comment.creator" />
      </RouterLink>
    </div>
    <div class="flex-grow-1">
      <div>
        <RouterLink :to="{ name: 'Profile Details', params: { profileId: comment.creatorId } }"
          :title="`Go to ${comment.creator.name}'s profile page`">
          <span class="fs-3 fw-bold">{{ comment.creator.name }}</span>
        </RouterLink>
        <span class="d-md-none">
          <ProfilePicture width="3rem" :profile="comment.creator" />
        </span>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>