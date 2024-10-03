<script setup>
import { Account } from '@/models/Account.js';

defineProps({
  profile: { type: Account, required: true },
  width: { type: String, required: true }
})
</script>


<template>
  <img :src="profile.picture" :alt="`${profile.name}'s profile picture'`">
</template>


<style lang="scss" scoped>
img {
  width: v-bind(width);
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
</style>