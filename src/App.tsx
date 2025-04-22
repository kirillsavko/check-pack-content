import { FC, JSX } from 'react'
import { MainView } from './views/MainView/MainView.tsx'
import { PackContentProvider } from './store/PackContentStore.tsx'
import './App.scss'

export const App: FC = (): JSX.Element => {
  return (
    <div className='app'>
      <PackContentProvider>
        <MainView/>
      </PackContentProvider>
    </div>
  )
}
