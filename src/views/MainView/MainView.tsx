import React, {FC} from "react";
import {Container} from "react-bootstrap";

import {useJsonRpc} from "../../hooks/useJsonRpc";
import {useAtomicApi} from "../../hooks/useAtomicApi";

import {SearchPackForm} from "./SearchPackForm/SearchPackForm";
import {TemplatesList} from "./TemplatesList/TemplatesList";

import './MainView.scss'

export type Rarities = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Starter'
/**
 * Object for using an iteration by the {@link Rarities}
 */
export const rarities: Record<Rarities, Rarities> = {
  'Common': 'Common',
  'Rare': 'Rare',
  'Epic': 'Epic',
  'Legendary': 'Legendary',
  'Mythic': 'Mythic',
  'Starter': 'Starter',
}

export const MainView: FC = () => {
  const useRpc = useJsonRpc()
  const atomicApi = useAtomicApi()

  return (
    <Container className='pt-3 pb-3'>
      <h3 className='mb-4'>Enter the template ID you want to check</h3>
      <SearchPackForm useRpc={useRpc} />
      {useRpc.packRolls.map(item => (
        <details key={item.roll_id}>
          <summary>Slot: {item.roll_id}</summary>
          <TemplatesList packRolls={item} atomicApi={atomicApi} />
        </details>
      ))}
    </Container>
  )
}
