import { createContext, FC, JSX, PropsWithChildren, useContext, useState } from 'react'

import { jsonRpcService } from '../services/jsonRpcService.ts'
import { atomicApiService } from '../services/atomicApiService.ts'
import { PackContentForUI, packContentService } from '../services/packContentService.ts'


type Context = {
  packContent: PackContentForUI[]
  gettingPackContent: boolean
  gettingPackContentError: string
  getPackContent: (template: string) => Promise<void>
  setGettingPackContentError: (value: (((prevState: string) => string) | string)) => void
}

const PackContentContext = createContext<Context | null>(null)

export const PackContentProvider: FC<PropsWithChildren> = (props): JSX.Element => {
  const [packContent, setPackContent] = useState<PackContentForUI[]>([])
  const [gettingPackContent, setGettingPackContent] = useState(false)
  const [gettingPackContentError, setGettingPackContentError] = useState('')

  async function getPackContent(templateId: string) {
    setPackContent([])
    setGettingPackContent(true)
    setGettingPackContentError('')

    try {
      const packId = await jsonRpcService.getTableRows('atomicpacksx', 'packs', 'atomicpacksx', 1000, templateId, templateId, 2)
      if (packId.rows[0]?.pack_id) {
        const packContentChain = await jsonRpcService.getTableRows('atomicpacksx', 'packrolls', packId.rows[0].pack_id, 1000)
        const templateIds = packContentService.getTemplateIdsFromPackContent(packContentChain.rows)
        const atomicTemplates = await atomicApiService.getTemplatesByIds(templateIds)
        const packContentUI = packContentService.getPackContentForUI(packContentChain.rows, atomicTemplates)
        setPackContent(packContentUI)
      } else {
        throw new Error('There is no pack for this template')
      }
    } catch (e) {
      if (e instanceof Error) {
        setGettingPackContentError(e.message)
      } else {
        setGettingPackContentError('Unknown error when getting pack content')
      }
    } finally {
      setGettingPackContent(false)
    }
  }

  return (
    <PackContentContext.Provider value={{
      packContent, gettingPackContent, gettingPackContentError, getPackContent,
      setGettingPackContentError,
    }}>
      {props.children}
    </PackContentContext.Provider>
  )
}

export const usePackContent = () => {
  const context = useContext(PackContentContext)
  if (!context) {
    throw new Error('usePackContent must be used within a PackContentProvider')
  }
  return context
}

