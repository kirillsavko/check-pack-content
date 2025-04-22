import { FC, Fragment, JSX } from 'react'
import { Card, Collapse, Flex, Image, Spin, Tooltip, Typography } from 'antd'

import { usePackContent } from '../../store/PackContentStore.tsx'
import { PackContentForUI } from '../../services/packContentService.ts'
import { calculationsService } from '../../services/calculationsService.ts'
import { templatesService } from '../../services/templatesService.ts'
import { AtomicTemplate } from '../../types/atomicApiTypes.ts'

import { Rarity } from '../Rarity/Rarity.tsx'
import Placeholder from '../../assets/images/placeholder.png'
import { OddsPerRarity } from '../OddsPerRarity/OddsPerRarity.tsx'

import './SearchPackContentResult.scss'

type TemplateProps = {
  template: AtomicTemplate
  odds: number
  totalOdds: number
}

const Template: FC<TemplateProps> = ({ template, odds, totalOdds }): JSX.Element => {
  const atomicHubLink = templatesService.getTemplateLinkOnAtomicHub(template)
  const odd = calculationsService.getPercentage(odds, totalOdds)
  const imageLink = templatesService.getImageLinkToTemplate(template)

  return (
    <Card className='search-pack-content-result__card'>
      <Image
        width={100}
        height={123}
        src={imageLink}
        fallback={Placeholder}
        placeholder={<Image src={Placeholder} preview={false} />}
      />
      <Flex className='search-pack-content-result__card-text' vertical>
        {!!template.immutable_data.name && (
          <Typography.Title level={5}>
            {String(template.immutable_data.name)}
          </Typography.Title>
        )}
        <Typography.Text>
          Template Id:&nbsp;
          <Typography.Link href={atomicHubLink} target='_blank'>
            {template.template_id}
          </Typography.Link>
        </Typography.Text>
        {!!template.immutable_data.level && (
          <Typography.Text>Level: {String(template.immutable_data.level)}</Typography.Text>
        )}
        {!!template.immutable_data.rarity && <Rarity rarity={String(template.immutable_data.rarity)} />}
        <Typography.Text>
          <Tooltip title='The odd of getting it in the slot'>Odd: {odd}%</Tooltip>
        </Typography.Text>
      </Flex>
    </Card>
  )
}

type TemplatesProps = {
  packContent: PackContentForUI
}

const Templates: FC<TemplatesProps> = ({ packContent }): JSX.Element => {
  return <>
    <OddsPerRarity packContent={packContent} />
    <Flex gap={10} wrap='wrap'>
      {packContent.templates.map(template => {
        if (!template || !template?.template) {
          return null
        }

        return (
          <Fragment key={template.template.template_id + template.odds}>
            <Template
              template={template.template}
              odds={template.odds} totalOdds={packContent.totalOdds}
            />
          </Fragment>
        )
      })}
    </Flex>
  </>
}

export const SearchPackContentResult: FC = (): JSX.Element => {
  const packContentHook = usePackContent()

  return (
    <div className='search-pack-content-result'>
      {packContentHook.gettingPackContent && (
        <Flex justify='center'>
          <Spin size='large' />
        </Flex>
      )}
      {!packContentHook.gettingPackContent && packContentHook.packContent.length > 0 && (
        <Collapse>
          {packContentHook.packContent.map(pack => (
            <Collapse.Panel key={pack.slot} header={`Slot ${pack.slot + 1}`} forceRender>
              <Templates packContent={pack} />
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
      {packContentHook.gettingPackContentError && (
        <Flex justify='center'>
          <Typography.Text type='danger'>{packContentHook.gettingPackContentError}</Typography.Text>
        </Flex>
      )}
    </div>
  )
}
