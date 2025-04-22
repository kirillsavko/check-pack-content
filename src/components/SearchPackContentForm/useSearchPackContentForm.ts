import { FormEvent, useState } from 'react'
import { usePackContent } from '../../store/PackContentStore.tsx'

export function useSearchPackContentForm() {
  const packContentHook = usePackContent()

  const [searchTemplateId, setSearchTemplateId] = useState('')

  function searchTemplate(e: FormEvent) {
    e.preventDefault()
    if (searchTemplateId) {
      packContentHook.getPackContent(searchTemplateId)
    }
  }

  const submitButtonDisabled = packContentHook.gettingPackContent || !searchTemplateId
  const submitButtonLoading = packContentHook.gettingPackContent
  const inputDisabled = packContentHook.gettingPackContent

  function updateSearchTemplateId(value: string) {
    packContentHook.setGettingPackContentError('')
    setSearchTemplateId(value)
  }

  return {
    searchTemplateId, updateSearchTemplateId, submitButtonDisabled, searchTemplate,
    submitButtonLoading, inputDisabled,
  }
}
