import { blue, red, green, yellow, purple } from '@ant-design/colors'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

export type RarityData = Record<Rarity, { rarityText: string, color: string }>

export const rarities: RarityData = {
  common: {
    rarityText: 'Common',
    color: green[5],
  },
  rare: {
    rarityText: 'Rare',
    color: blue[5],
  },
  epic: {
    rarityText: 'Epic',
    color: purple[5],
  },
  legendary: {
    rarityText: 'Legendary',
    color: yellow[6],
  },
  mythic: {
    rarityText: 'Mythic',
    color: red[5],
  },
}
