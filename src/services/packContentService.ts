import { AtomicTemplate } from '../types/atomicApiTypes.ts'

type PackContentFromChain = {
  outcomes: { odds: number, template_id: number }[]
  roll_id: number
  total_odds: number
}

type AtomicTemplateWithOdds = {
  template: AtomicTemplate | undefined
  odds: number
}

export type PackContentForUI = {
  slot: number
  templates: (AtomicTemplateWithOdds | undefined)[]
  totalOdds: number
}

class PackContentService {
  getTemplateIdsFromPackContent(packContent: PackContentFromChain[]): number[] {
    return packContent.flatMap(pack =>
      pack.outcomes.map(outcome => outcome.template_id)
    )
  }

  getPackContentForUI(packContent: PackContentFromChain[], atomicTemplates: AtomicTemplate[]): PackContentForUI[] {
    return packContent.map((pack, index) => {
      const templates: AtomicTemplateWithOdds[] = pack.outcomes.map(outcome => {
        const template = atomicTemplates.find(template => template.template_id === outcome.template_id.toString())

        return { template: template, odds: outcome.odds }
      })

      return {
        slot: index,
        totalOdds: pack.total_odds,
        templates
      }
    })
  }
}

export const packContentService = new PackContentService()
