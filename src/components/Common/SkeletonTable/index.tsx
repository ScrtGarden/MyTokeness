import { FC, memo } from 'react'

import { Skeleton } from '../../UI/Loaders'
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '../../UI/Table'

type Props = {
  rows: number
}

const SkeletonTable: FC<Props> = ({ rows = 2 }) => (
  <>
    <Skeleton noflex width="100px" height="32px" />
    <Table>
      <Head>
        <HeaderRow>
          <HeaderCell width="70">
            <Skeleton width="30px" />
          </HeaderCell>
          <HeaderCell width="300">
            <Skeleton width="40%" />
          </HeaderCell>
          <HeaderCell>
            <Skeleton width="40%" />
          </HeaderCell>
          <HeaderCell>
            <Skeleton width="40%" />
          </HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {Array.from(Array(rows).keys()).map((value) => (
          <Row key={value}>
            <Cell>
              <Skeleton width="30px" />
            </Cell>
            <Cell>
              <Skeleton width="20%" />
            </Cell>
            <Cell>
              <Skeleton width="80%" />
            </Cell>
            <Cell>
              <Skeleton width="50%" />
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  </>
)

export default memo(SkeletonTable)
