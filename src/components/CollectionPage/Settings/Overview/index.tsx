import { useRouter } from 'next/router'

import {
  QueryContractConfig,
  QueryContractInfo,
  ResultContractConfig,
  ResultContractInfo,
} from '../../../../../interface/nft'
import useQueryContract from '../../../../hooks/useQueryContract'
import SkeletonCard from '../../../Cards/Skeleton'
import EmptyList from '../../../EmptyList'
import { CollectionRouterQuery } from '../../../Layouts/CollectionLayout'
import { Header, SettingsCard, Wrapper } from '../../../UI/Card'
import { Label } from '../../../UI/Forms'
import { Text } from '../../../UI/Typography'
import { Container } from '../styles'
import { Field } from './styles'

const Overview = () => {
  const router = useRouter()
  const { contractAddress } = router.query as CollectionRouterQuery

  // custom hooks
  const {
    data: info,
    isLoading: fetchingInfo,
    isError: infoErr,
  } = useQueryContract<QueryContractInfo, ResultContractInfo>(
    ['contractInfo', contractAddress],
    contractAddress,
    { contract_info: {} },
    { refetchOnWindowFocus: false }
  )

  const {
    data: config,
    isLoading: fetchingConfig,
    isError: configErr,
  } = useQueryContract<QueryContractConfig, ResultContractConfig>(
    ['contractConfig', contractAddress],
    contractAddress,
    {
      contract_config: {},
    },
    { refetchOnWindowFocus: false }
  )

  if (fetchingConfig || fetchingInfo) {
    return (
      <Container>
        <SkeletonCard hidebutton />
      </Container>
    )
  }

  if (!config || !info || infoErr || configErr) {
    return (
      <Container>
        <EmptyList
          text="Ooops! Looks like something went wrong."
          icon="sad-tear-duo"
        />
      </Container>
    )
  }

  return (
    <Container>
      <SettingsCard>
        <Header>Information</Header>
        <Wrapper>
          <Field>
            <Label>Name:</Label>
            <Text>{info?.contract_info.name}</Text>
          </Field>
          <Field>
            <Label>Symbol:</Label>
            <Text>{info?.contract_info.symbol}</Text>
          </Field>
        </Wrapper>
      </SettingsCard>
      <SettingsCard>
        <Header>Configuration</Header>
        <Wrapper>
          <Field>
            <Label>Public token supply:</Label>
            <Text>
              {config.contract_config.token_supply_is_public ? 'Yes' : 'No'}
            </Text>
          </Field>
          <Field>
            <Label>Public owner:</Label>
            <Text>{config.contract_config.owner_is_public ? 'Yes' : 'No'}</Text>
          </Field>
          <Field>
            <Label>Enabled sealed metatdata:</Label>
            <Text>
              {config.contract_config.sealed_metadata_is_enabled ? 'Yes' : 'No'}
            </Text>
          </Field>
          <Field>
            <Label>Unwrapped metadata is private:</Label>
            <Text>
              {config.contract_config.unwrapped_metadata_is_private
                ? 'Yes'
                : 'No'}
            </Text>
          </Field>
          <Field>
            <Label>Minter may update metadata:</Label>
            <Text>
              {config.contract_config.minter_may_update_metadata ? 'Yes' : 'No'}
            </Text>
          </Field>
          <Field>
            <Label>Owner may update metadata:</Label>
            <Text>
              {config.contract_config.owner_may_update_metadata ? 'Yes' : 'No'}
            </Text>
          </Field>
          <Field>
            <Label>Enabled burn:</Label>
            <Text>{config.contract_config.burn_is_enabled ? 'Yes' : 'No'}</Text>
          </Field>
        </Wrapper>
      </SettingsCard>
    </Container>
  )
}

export default Overview
