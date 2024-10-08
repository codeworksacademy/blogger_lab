<script setup>
import { Comment } from '@/models/Comment.js';
import ProfilePicture from './ProfilePicture.vue';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { commentsService } from '@/services/CommentsService.js';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';

const props = defineProps({
  comment: { type: Comment, required: true }
})
const account = computed(() => AppState.account)

async function deleteComment() {
  try {
    const wantsToDelete = await Pop.confirm('Are you sure that you want to delete your comment?')
    if (!wantsToDelete) return
    await commentsService.deleteComment(props.comment.id)
    Pop.success('Comment was deleted')
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
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
        <div class="d-flex gap-2 align-items-center">
          <RouterLink :to="{ name: 'Profile Details', params: { profileId: comment.creatorId } }"
            :title="`Go to ${comment.creator.name}'s profile page`">
            <span class="fs-3 fw-bold">{{ comment.creator.name }}</span>
          </RouterLink>
          <button v-if="comment.creatorId == account?.id" @click="deleteComment()"
            class="btn btn-outline-danger delete-comment" title="Delete this comment">
            <i class="mdi mdi-close-thick"></i>
          </button>
        </div>
        <span class="d-md-none">
          <ProfilePicture width="3rem" :profile="comment.creator" />
        </span>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.delete-comment {
  opacity: 0;
  transition: all .5s ease-in-out;
}

.rounded:hover .delete-comment {
  opacity: unset;
}
</style>