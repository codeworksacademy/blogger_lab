<script setup>
import { AppState } from '@/AppState.js';
import BlogCard from '@/components/BlogCard.vue';
import BlogForm from '@/components/BlogForm.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import ProfileForm from '@/components/ProfileForm.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { blogsService } from '@/services/BlogsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const profile = computed(() => AppState.profile)
const blogs = computed(() => AppState.blogs)
const isYourProfilePage = computed(() => profile.value?.id == AppState.account?.id)

watch(() => route.params.profileId, () => {
  getProfileById()
  getBlogsByProfileId()
}, { immediate: true })

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
async function getBlogsByProfileId() {
  try {
    const profileId = route.params.profileId
    await blogsService.getBlogsByProfileId(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
</script>


<template>
  <div class="container">
    <div v-if="profile" class="row mb-4">
      <div class="col-12">
        <div class="d-md-flex gap-5 align-items-start">
          <div class="text-center mb-4">
            <ProfilePicture width="20rem" :profile="profile" />
          </div>
          <div>
            <div class="d-flex gap-4 align-items-center">
              <h1>{{ profile.name }}</h1>
              <button v-if="isYourProfilePage" class="btn btn-warning px-4 fs-3" type="button" title="Edit your profile"
                data-bs-toggle="modal" data-bs-target="#profile-modal">
                <i class="mdi mdi-pen"></i>
              </button>
            </div>
            <p>{{ profile.bio }}</p>
          </div>
        </div>
        <button v-if="isYourProfilePage" class="btn btn-warning px-4 fs-3 mt-2" type="button" title="Create a new blog"
          data-bs-toggle="modal" data-bs-target="#blog-modal">
          <i class="mdi mdi-plus-thick"></i>
        </button>
      </div>
    </div>
    <div v-else class="row mb-4">
      <div class="col-12">
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
    <div class="row">
      <div v-for="blog in blogs" :key="blog.id" class="col-12 mb-4">
        <BlogCard :blog="blog" />
      </div>
    </div>
  </div>

  <ModalWrapper v-if="isYourProfilePage" modalId="profile-modal" modalTitle="Edit Your Profile">
    <ProfileForm />
  </ModalWrapper>
  <ModalWrapper v-if="isYourProfilePage" modalId="blog-modal" modalTitle="Start a Blog">
    <BlogForm />
  </ModalWrapper>
</template>


<style lang="scss" scoped>
.profile-img {
  height: 20rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
</style>