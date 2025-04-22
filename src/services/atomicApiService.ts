import { AtomicTemplate } from '../types/atomicApiTypes.ts'

const apiLink = 'https://wax.api.atomicassets.io/atomicassets/v1'

class AtomicApiService {
  private readonly apiLink: string

  constructor(apiLink: string) {
    this.apiLink = apiLink
  }

  getTemplatesByIds = async (ids: number[]): Promise<AtomicTemplate[]> => {
    if (ids.length > 100) {
      const currentBatch = await this.getTemplatesByIds(ids.slice(0, 100))
      const otherBatch = await this.getTemplatesByIds(ids.slice(100))
      return currentBatch.concat(otherBatch)
    }

    const endpoint = new URL(`${this.apiLink}/templates`)
    const params = new URLSearchParams({
      ids: ids.join(',')
    })
    endpoint.search = params.toString()
    return fetch(endpoint.toString())
      .then(res => res.json())
      .then((res) => res.data)
  }
}

export const atomicApiService = new AtomicApiService(apiLink)
