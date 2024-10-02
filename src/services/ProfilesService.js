import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from "@/models/Account.js"
import { AppState } from "@/AppState.js"

class ProfilesService {
  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('GOT PROFILE 🙍‍♂️', response.data)
    const profile = new Account(response.data)
    AppState.profile = profile
  }
}

export const profilesService = new ProfilesService()