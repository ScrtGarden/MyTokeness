import { FC, memo } from 'react'

import { Container, Tab } from './styles'

interface Tab {
  label: string
  disabled?: boolean
}

type Props = {
  tabs: { [key: string]: Tab }
  onClick?: (key: string) => void
  tab?: string
}

const Tabs: FC<Props> = ({ tabs, onClick = () => null, tab }) => {
  return (
    <Container>
      {Object.entries(tabs).map(([key, value]) => (
        <Tab
          key={key}
          selected={key === tab}
          onClick={() => onClick(key)}
          disabled={value.disabled}
        >
          {value.label}
        </Tab>
      ))}
    </Container>
  )
}

export default memo(Tabs)
