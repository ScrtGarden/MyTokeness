import cryptoRandomString from 'crypto-random-string'
import { UseMutationResult, useMutation } from 'react-query'
import { ExecuteResult } from 'secretjs'

import { HandleCreateViewingKey } from '../../interface/nft'
import { MAX_GAS } from '../../utils/constants'
import { executeContract } from '../../utils/contractInteractions'

const useMutationCreateNFTKey = (
  contractAddress: string
): UseMutationResult<ExecuteResult, Error> =>
  useMutation(() =>
    executeContract<HandleCreateViewingKey>({
      contractAddress,
      maxGas: MAX_GAS.NFT.CREATE_VIEWING_KEY,
      handleMsg: {
        create_viewing_key: {
          entropy: cryptoRandomString({ length: 40, type: 'base64' }),
        },
      },
    })
  )

export default useMutationCreateNFTKey
