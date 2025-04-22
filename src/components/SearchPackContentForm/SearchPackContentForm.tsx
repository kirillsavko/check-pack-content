import { FC, JSX } from 'react'
import { Button, InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useSearchPackContentForm } from './useSearchPackContentForm.ts'
import './SearchPackContentForm.scss'

export const SearchPackContentForm: FC = (): JSX.Element => {
  const searchPackContentFormHook = useSearchPackContentForm()

  return (
    <form className='search-pack-content-form' onSubmit={searchPackContentFormHook.searchTemplate}>
      <InputNumber
        placeholder='Template ID, e.g. 782848' type='number' min='0'
        className='search-pack-content-form__input'
        value={searchPackContentFormHook.searchTemplateId}
        onChange={value => searchPackContentFormHook.updateSearchTemplateId(value ? value.toString() : '')}
        disabled={searchPackContentFormHook.inputDisabled}
      />
      <Button
        shape="circle" icon={<SearchOutlined/>} htmlType='submit'
        loading={searchPackContentFormHook.submitButtonLoading}
        disabled={searchPackContentFormHook.submitButtonDisabled}
      />
    </form>
  )
}
