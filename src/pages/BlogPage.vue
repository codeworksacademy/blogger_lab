<script setup>
import { AppState } from '@/AppState.js';
import BlogBodyForm from '@/components/BlogBodyForm.vue';
import BlogForm from '@/components/BlogForm.vue';
import CommentCard from '@/components/CommentCard.vue';
import CommentForm from '@/components/CommentForm.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { blogsService } from '@/services/BlogsService.js';
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const blog = computed(() => AppState.activeBlog)
const account = computed(() => AppState.account)
const comments = computed(() => AppState.comments)
const showBodyEditForm = ref(false)

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
    Pop.error(error)
    logger.error(error)
    if (error.response?.status == 403) {
      router.push({ name: 'Home' })
    }
  }
}

async function getCommentsByBlogId() {
  try {
    const blogId = route.params.blogId
    await commentsService.getCommentsByBlogId(blogId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
    if (error.response?.status == 403) {
      router.push({ name: 'Home' })
    }
  }
}

async function deleteBlog() {
  try {
    const wantsToDelete = await Pop.confirm(`Are you sure that you want to delete the ${blog.value.title} blog?`)
    if (!wantsToDelete) return

    await blogsService.deleteBlog(blog.value.id)
    router.push({ name: 'Profile Details', params: { profileId: blog.value.creatorId } })
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <div v-if="blog" class="container">
    <section class="row mb-4">
      <div class="col-12">
        <div class="rounded border border-dark border-3 px-md-5 px-2 py-4">
          <img :src="blog.imgUrl" :alt="'Cover image for ' + blog.title" class="blog-img rounded mb-2">
          <div class="d-flex gap-4 align-items-start mb-3">
            <RouterLink :to="{ name: 'Profile Details', params: { profileId: blog.creatorId } }"
              :title="`Go to ${blog.creator.name}'s profile page`" class="d-none d-md-inline">
              <ProfilePicture width="10rem" :profile="blog.creator" />
            </RouterLink>
            <div class="flex-grow-1">
              <h1>
                {{ blog.title }}
                <i v-if="!blog.published" class="mdi mdi-book-lock" title="This blog is not published"></i>
              </h1>
              <div class="d-flex flex-wrap gap-1 mb-2">
                <span v-for="tag in blog.tags" :key="tag" class="border border-1 border-dark px-1">
                  <i class="mdi mdi-tag"></i>
                  {{ tag }}
                </span>
              </div>
              <RouterLink :to="{ name: 'Profile Details', params: { profileId: blog.creatorId } }"
                :title="`Go to ${blog.creator.name}'s profile page`" class="creator-name">
                <h2 class="fs-4 ">by {{ blog.creator.name }}</h2>
              </RouterLink>
              <h3 class="fs-4">Last updated:
                <time :datetime="blog.updatedAt.toLocaleDateString()">
                  {{ blog.updatedAt.toLocaleDateString() }}
                </time>
              </h3>
            </div>
            <div v-if="account?.id == blog.creatorId" class="dropdown">
              <button class="btn btn-warning dropdown-toggle fs-5" type="button" title="Blog Options"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-pen"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#blog-modal">Edit
                    Blog Details
                  </button>
                </li>
                <li>
                  <button @click="showBodyEditForm = !showBodyEditForm" class="dropdown-item" type="button">
                    {{ showBodyEditForm ? 'Exit Edit Mode' : 'Edit Blog Body' }}
                  </button>
                </li>
                <li>
                  <button @click="deleteBlog()" class="dropdown-item text-danger" type="button">
                    Delete Blog
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <BlogBodyForm v-if="showBodyEditForm" @blog-edit-completed="showBodyEditForm = false" />
          <p v-else v-for="paragraph in blog.body.split('\n')" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12 mb-3">
        <div class="d-flex gap-4 align-items-center">
          <h2>Comments</h2>
          <button v-if="account" class="btn btn-warning px-3 fs-4" type="button" title="Leave a comment"
            data-bs-toggle="modal" data-bs-target="#comment-modal">
            <i class="mdi mdi-plus-thick"></i>
          </button>
        </div>
      </div>
      <div v-if="comments.length == 0">
        <h3>Be the first to leave a comment!</h3>
      </div>
      <div v-else v-for="comment in comments" :key="comment.id" class="col-12 mb-3">
        <CommentCard :comment="comment" />
      </div>
    </section>
  </div>
  <div v-else class="container">
    <section class="row">
      <div class="col-12">
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </section>
  </div>

  <ModalWrapper modalId="comment-modal" modalTitle="Create Comment">
    <CommentForm />
  </ModalWrapper>
  <ModalWrapper modalId="blog-modal" modalTitle="Edit Blog">
    <BlogForm />
  </ModalWrapper>
</template>


<style lang="scss" scoped>
.blog-img {
  width: 100%;
  height: 50dvh;
  object-fit: cover;
}

.creator-name {
  display: inline-block;
  width: fit-content;
}

p {
  word-wrap: break-word;
}
</style>