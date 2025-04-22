import { rarities, Rarity } from '../constants/rarity.ts'
import { calculationsService } from './calculationsService.ts'
import { PackContentForUI } from './packContentService.ts'

class RaritiesService {
  getOddsByRarities(packContent: PackContentForUI) {
    return Object.entries(rarities).map(([key, value]) => {
      const rarityOdds = packContent.templates.reduce((acc, template) => {
        const templateRarity = String(template?.template?.immutable_data?.rarity)?.toLowerCase()
        if (templateRarity === key.toLowerCase()) {
          acc += template?.odds || 0
        }
        return acc
      }, 0)

      return {
        ...value,
        percentage: calculationsService.getPercentage(rarityOdds, packContent.totalOdds),
      }
    })
  }

  isRarity(value: string): value is Rarity {
    return ['common', 'rare', 'epic', 'legendary', 'mythic'].includes(value.toLowerCase())
  }
}

export const raritiesService = new RaritiesService()
