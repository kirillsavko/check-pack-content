import { FC, JSX } from 'react'
import { Flex } from 'antd'
import { SearchPackContentForm } from '../../components/SearchPackContentForm/SearchPackContentForm.tsx'
import { SearchPackContentResult } from '../../components/SearchPackContentResult/SearchPackContentResult.tsx'

import { Footer } from '../../components/Footer/Footer.tsx'

import './MainView.scss'

export const MainView: FC = (): JSX.Element => {
  return (
    <Flex className='main-view' vertical>
      <SearchPackContentForm />
      <SearchPackContentResult />
      <Footer />
    </Flex>
  )
}
