import {AtomicTemplate} from "../types/atomicApiTypes";

/**
 * Sorts templates by the level
 * @param templates Template should be sorted
 */
export const sortTemplatesByLevel = (templates: AtomicTemplate[]) => {
  return templates.sort((a, b) => {
    return a.immutable_data.level - b.immutable_data.level
  })
}

const apiLink = 'https://wax.api.atomicassets.io/atomicassets/v1'

export type AtomicApiHook = ReturnType<typeof useAtomicApi>

export function useAtomicApi () {
  const getTemplatesByIds = async (ids: number[]): Promise<AtomicTemplate[]> => {
    if (ids.length > 100) {
      const currentBatch = await getTemplatesByIds(ids.slice(0, 100))
      const otherBatch = await getTemplatesByIds(ids.slice(100))
      return currentBatch.concat(otherBatch)
    }

    const endpoint = new URL(`${apiLink}/templates`)
    const params = new URLSearchParams({
      ids: ids.join(',')
    })
    endpoint.search = params.toString()
    return fetch(endpoint.toString())
      .then(res => res.json())
      .then((res) => res.data)
  }

  return {
    /**
     * Gets the list of templates by IDs
     */
    getTemplatesByIds,
  }
}
