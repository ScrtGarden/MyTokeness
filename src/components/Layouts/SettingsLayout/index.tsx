import { useRouter } from 'next/router'

import { useStoreState } from '../../../hooks/storeHooks'
import { Container } from '../../UI/Containers'
import { getLayout as getCollectionLayout } from '../CollectionLayout'

type Props = {
  children?: React.ReactElement
}

const SettingsLayout = ({ children }: Props) => {
  const router = useRouter()

  return <>{children}</>
}

const getLayout = (page: JSX.Element) =>
  getCollectionLayout(<SettingsLayout>{page}</SettingsLayout>)

export { SettingsLayout as default, getLayout }
