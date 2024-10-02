<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const profile = computed(() => AppState.profile)
const account = computed(() => AppState.account)

watch(() => route.params.profileId, () => {
  getProfileById()
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
</script>


<template>
  <div class="container">
    <div v-if="profile" class="row">
      <div class="col-12">
        <div class="d-flex gap-5 align-items-start">
          <img :src="profile.picture" :alt="profile.name" class="profile-img">
          <div class="d-flex gap-4 align-items-center">
            <h1>{{ profile.name }}</h1>
            <button v-if="account?.id == profile.id" class="btn btn-warning fs-2" type="button"
              title="Edit your profile">
              <i class="mdi mdi-pen"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <h1>Loading...</h1>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  height: 20rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
</style>