<script setup>
import { AppState } from '@/AppState.js';
import CommentCard from '@/components/CommentCard.vue';
import CommentForm from '@/components/CommentForm.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { blogsService } from '@/services/BlogsService.js';
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const blog = computed(() => AppState.activeBlog)
const account = computed(() => AppState.account)
const comments = computed(() => AppState.comments)

onMounted(() => {
  getBlogById()
  getCommentsByBlogId()
})
async function getBlogById() {
  try {
    const blogId = route.params.blogId
    await blogsService.getBlogById(blogId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
async function getCommentsByBlogId() {
  try {
    const blogId = route.params.blogId
    await commentsService.getCommentsByBlogId(blogId)
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<template>
  <div v-if="blog" class="container">
    <section class="row mb-4">
      <div class="col-12">
        <div class="rounded border border-dark border-3 px-5 py-4">
          <img :src="blog.imgUrl" :alt="'Cover image for ' + blog.title" class="blog-img rounded mb-2">
          <div class="d-flex gap-4 align-items-start mb-3">
            <ProfilePicture width="10rem" :profile="blog.creator" />
            <div class="flex-grow-1">
              <h1>{{ blog.title }}</h1>
              <h2 class="fs-4">by {{ blog.creator.name }}</h2>
              <h3 class="fs-4">Last updated:
                <time :datetime="blog.updatedAt.toLocaleDateString()">
                  {{ blog.updatedAt.toLocaleDateString() }}
                </time>
              </h3>
            </div>
            <button v-if="account?.id == blog.creatorId" class="btn btn-warning px-3 fs-4" type="button"
              title="Edit this blog">
              <i class="mdi mdi-pen"></i>
            </button>
          </div>
          <p class="mb-0">{{ blog.body }}</p>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12 mb-3">
        <div class="d-flex gap-4 align-items-center">
          <h2>Comments</h2>
          <button v-if="account" class="btn btn-warning px-3 fs-4" type="button" title="Leave a comment"
            data-bs-toggle="modal" data-bs-target="#commentModal">
            <i class="mdi mdi-plus-thick"></i>
          </button>
        </div>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="col-12">
        <CommentCard :comment="comment" />
      </div>
    </section>
  </div>
  <div v-else class="container">
    <section class="row">
      <div class="col-12">
        <h1>Loading...</h1>
      </div>
    </section>
  </div>

  <ModalWrapper modalId="commentModal" modalTitle="Create Comment">
    <CommentForm />
  </ModalWrapper>
</template>


<style lang="scss" scoped>
.blog-img {
  width: 100%;
  height: 50dvh;
  object-fit: cover;
}
</style>