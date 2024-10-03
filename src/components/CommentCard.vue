<script setup>
import { Comment } from '@/models/Comment.js';

defineProps({
  comment: { type: Comment, required: true }
})
</script>


<template>
  <div class="rounded border border-dark border-3">
    {{ comment.body }}
  </div>
</template>


<style lang="scss" scoped></style>