import { FC, JSX } from 'react'
import { Typography } from 'antd'
import { gray } from '@ant-design/colors'
import { rarities } from '../../constants/rarity.ts'
import { raritiesService } from '../../services/raritiesService.ts'

type RarityProps = {
  rarity: string
}

export const Rarity: FC<RarityProps> = ({ rarity }): JSX.Element => {
  const key = rarity.toLowerCase()
  const color = raritiesService.isRarity(key) ? rarities[key].color : gray[13]

  return (
    <Typography.Text>
      Rarity:&nbsp;
      <Typography.Text style={{ color: color }}>
        {rarity}
      </Typography.Text>
    </Typography.Text>
  )
}
