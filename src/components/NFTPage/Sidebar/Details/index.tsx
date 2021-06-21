import { FC, memo } from 'react'

import { Attribute } from '../../../../../interface/nft-ui'
import { Markdown } from '../../../UI/Markdown'
import { Text } from '../../../UI/Typography'
import { Attributes, Container } from './styles'

export type Props = {
  description?: string
  attributes: Attribute[]
}

const Details: FC<Props> = ({ description = '', attributes }) => (
  <Container>
    {!!description && <Markdown>{description}</Markdown>}
    {attributes.length !== 0 && (
      <Attributes>
        {attributes.map(({ key, value }) => (
          <Text key={key}>
            <span>{key}</span>
            &nbsp; {value}
          </Text>
        ))}
      </Attributes>
    )}
  </Container>
)

export default memo(Details)
