import { FC, JSX } from 'react'
import { Flex, Typography } from 'antd'

export const Footer: FC = (): JSX.Element => {
  return (
    <footer style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid black' }}>
      <Flex justify='center'>
        <Typography.Text>
          © Kiryl Sauko
        </Typography.Text>
      </Flex>
    </footer>
  )
}
