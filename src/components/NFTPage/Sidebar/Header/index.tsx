import { FC, memo, useMemo } from 'react'

import { Category, UIPublicMetadata } from '../../../../../interface/nft-ui'
import { NFT_CATEGORIES_ICON_MAP } from '../../../../../utils/constants'
import {
  Categories,
  Container,
  Item,
  Rarity,
  StyledIcon,
  Title,
} from './styles'

export type Props = {
  name: string
  rarity: UIPublicMetadata['properties']['rarity']
  categories: Category[]
}

const Header: FC<Props> = ({
  name,
  rarity: { number, total },
  categories = [],
}) => {
  const sorted = useMemo(() => categories.sort(), [categories])

  return (
    <Container>
      <Title>{name}</Title>
      <Rarity>{`${number} of ${total}`}</Rarity>
      {categories.length !== 0 && (
        <Categories>
          {sorted.map((item) => (
            <Item key={item} color={NFT_CATEGORIES_ICON_MAP[item].COLOR}>
              <StyledIcon
                name={NFT_CATEGORIES_ICON_MAP[item].ICON}
                height={20}
                width={20}
                fill={NFT_CATEGORIES_ICON_MAP[item].COLOR}
              />
              {item}
            </Item>
          ))}
        </Categories>
      )}
    </Container>
  )
}

export default memo(Header)
