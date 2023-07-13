import Decimal from "decimal.js";

import {AtomicTemplate} from "../types/atomicApiTypes";
import {PackRolls} from "../hooks/useJsonRpc";
import {Rarities} from "../views/MainView/MainView";

/**
 * Returns the odd for one template from the list outcome NFTs for a pack
 * @param template For this template the odd should be find
 * @param packRolls The list of all pack rolls
 */
export const getOddForOneTemplate = (template: AtomicTemplate, packRolls: PackRolls): number => {
  const templateOdd = packRolls.outcomes.find(item => item.template_id.toString() === template.template_id.toString())?.odds

  if (templateOdd) {
    const decimalValue = new Decimal(templateOdd).div(packRolls.total_odds).mul(100)
    return decimalValue.toNumber()
  }

  return 0
}

/**
 * Guard checks if the value is a part of the {@link Rarities} type
 * @param value Value should be checked
 */
const isRarity = (value: string): value is Rarities => {
  return value in { Common: true, Rare: true, Epic: true, Legendary: true, Mythic: true, Starter: true }
}

/**
 * Returns the sum of odds for every rarity
 * @param templates All NFTs in this list are used for odds calculation
 * @param packRolls Rolls of a pack
 */
export const getOddsForAllRarities = (templates: AtomicTemplate[], packRolls: PackRolls): Record<Rarities, number> => {
const result: Record<Rarities, Decimal> = {
    Common: new Decimal('0'),
    Rare: new Decimal('0'),
    Epic: new Decimal('0'),
    Legendary: new Decimal('0'),
    Mythic: new Decimal('0'),
    Starter: new Decimal('0'),
  }

  templates.forEach(template => {
    const templateRarity: string = template.immutable_data.rarity
    if (isRarity(templateRarity)) {
      result[templateRarity] = result[templateRarity].plus(getOddForOneTemplate(template, packRolls))
    }
  })

  return {
    Common: result.Common.toNumber(),
    Rare: result.Rare.toNumber(),
    Epic: result.Epic.toNumber(),
    Legendary: result.Legendary.toNumber(),
    Mythic: result.Mythic.toNumber(),
    Starter: result.Starter.toNumber(),
  }
}
