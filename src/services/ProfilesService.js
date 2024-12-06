import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfile(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }

  async searchProfiles(query) {
    const res = await api.get('/api/profiles', {
      params: { query }
    })
    AppState.searchResults = res.data.map(p => new Profile(p))
  }

  async editProfile(profileData) {
    const res = await api.put('/account', profileData)
    AppState.account = new Profile(res.data)
  }
}

export const profilesService = new ProfilesService()