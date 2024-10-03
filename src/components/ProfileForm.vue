<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { computed, ref, watch } from 'vue';


const account = computed(() => AppState.account)

const editableAccountData = ref({ ...account.value })

watch(account, () => {
  editableAccountData.value = { ...account.value }
}, { immediate: true })


async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Modal.getInstance('#profileModal').hide()
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="updateAccount()">
    <div class="form-floating mb-3">
      <input v-model="editableAccountData.name" type="text" class="form-control" id="name" placeholder="Profile Name..."
        maxlength="100">
      <label for="name">Profile Name</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture"
        placeholder="Profile Picture..." maxlength="500">
      <label for="picture">Profile Picture</label>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editableAccountData.bio" class="form-control" placeholder="Profile Bio..." required
        maxlength="1000" id="body"></textarea>
      <label for="body">Comment Body</label>
    </div>
    <div class="text-end">
      <button class="btn btn-warning" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>