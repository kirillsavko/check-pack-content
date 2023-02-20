import React, {FC, useEffect, useState} from "react";
import {Button, Row} from "react-bootstrap";

import {getKeys} from "../../../services/typescript";
import {PackRolls} from "../../../hooks/useJsonRpc";
import {AtomicApiHook} from "../../../hooks/useAtomicApi";
import {AtomicTemplate} from "../../../types/atomicApiTypes";
import {getOddsForAllRarities} from "../../../services/odds";

import {Template} from "../../../components/Template/Template";
import {Rarities, rarities} from "../MainView";

import './TemplatesList.scss'

const filterTemplatesByRarity = (templates: AtomicTemplate[], rarity: Rarities) => {
  return templates.filter(item => item.immutable_data.rarity === rarity)
}

type TemplatesListProps = {
  /**
   * Hook for managing pack rolls functionality
   */
  packRolls: PackRolls
  /**
   * Hook for managing atomic API functionality
   */
  atomicApi: AtomicApiHook
}

export const TemplatesList: FC<TemplatesListProps> = ({
  packRolls, atomicApi
}) => {
  const [sortedByRarities, setSortedByRarities] = useState(false)

  const onButtonClick = () => setSortedByRarities(prev => !prev)
  const buttonLabel = sortedByRarities ? 'Reset sorting' : 'Sort by rarities (may not work with some packs)'

  const oddsForRarities = getOddsForAllRarities(atomicApi.templates, packRolls)

  useEffect(() => {
    const ids = packRolls.outcomes.map(item => item.template_id)

    atomicApi.refreshTemplatesByIds(ids)
  }, [packRolls])

  return <>
    <Button onClick={onButtonClick} className='mt-3 mb-3'>{buttonLabel}</Button>
    <div className="templates mb-5">
      {sortedByRarities
        ? getKeys(rarities).map(rarity => (
            <div key={rarity} className='templates__sorted-by-rarities'>
              <h6 className={rarity}>{rarity} in total: {oddsForRarities[rarity]}%</h6>
              {filterTemplatesByRarity(atomicApi.templates, rarity).map(item => (
                <Template key={item.template_id} template={item} packRolls={packRolls} />
              ))}
            </div>
        ))
        : atomicApi.templates.map(item => (
          <Template key={item.template_id} template={item} packRolls={packRolls} />
        ))}
    </div>
  </>
}
