import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { api } from "./AxiosService.js"

class AdsService {
  async getAds(count = 2) {
    const res = await api.get('/api/ads', {
      params: { count }
    })
    AppState.ads = res.data.map(a => new Ad(a))
  }
}

export const adsService = new AdsService()