import { FC, JSX } from 'react'
import { PackContentForUI } from '../../services/packContentService.ts'
import { Row, Typography } from 'antd'
import { raritiesService } from '../../services/raritiesService.ts'

type OddsPerRarityProps = {
  packContent: PackContentForUI
}

export const OddsPerRarity: FC<OddsPerRarityProps> = ({ packContent }): JSX.Element | undefined => {
  const oddsByRarity = raritiesService.getOddsByRarities(packContent)

  const componentShouldBeShown = oddsByRarity.some(odd => odd.percentage > 0)

  if (!componentShouldBeShown) {
    return
  }

  return (
    <div style={{ marginBottom: 15 }}>
      <Typography.Title level={3}>Odds by rarities</Typography.Title>
      {oddsByRarity.map(({ rarityText, percentage, color }) => (
        <Row key={rarityText}>
          <Typography.Text style={{ color: color }}>
            {rarityText}: {percentage}%
          </Typography.Text>
        </Row>
      ))}
    </div>
  )
}
