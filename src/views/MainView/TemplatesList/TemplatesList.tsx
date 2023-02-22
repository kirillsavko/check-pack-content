import React, {FC, useEffect, useState} from "react";

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
  const [templates, setTemplates] = useState<AtomicTemplate[]>([])

  const oddsForRarities = getOddsForAllRarities(templates, packRolls)

  const allTemplatesContainRarities = templates.every(item => item.immutable_data.rarity)

  useEffect(() => {
    const ids = packRolls.outcomes.map(item => item.template_id)

    if (ids.length > 0) {
      atomicApi.getTemplatesByIds(ids)
        .then(setTemplates)
    }
  }, [atomicApi, packRolls])

  return <>
    <div className="templates mb-5">
      {allTemplatesContainRarities
        ? getKeys(rarities).map(rarity => (
            <div key={rarity} className='templates__sorted-by-rarities'>
              <h6 className={rarity}>{rarity} in total: {oddsForRarities[rarity]}%</h6>
              {filterTemplatesByRarity(templates, rarity).map(item => (
                <Template key={item.template_id} template={item} packRolls={packRolls} />
              ))}
            </div>
        ))
        : templates.map(item => (
          <Template key={item.template_id} template={item} packRolls={packRolls} />
        ))}
    </div>
  </>
}
