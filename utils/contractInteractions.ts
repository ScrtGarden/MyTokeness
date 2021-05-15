import { ExecuteResult, InstantiateResult } from 'secretjs'

import { InitMsg as Snip20InitMsg } from '../interface/snip20'
import keplr from './keplr'

export type Params = {
  initMsg: Snip20InitMsg
  label: string
  codeId: number
  maxGas: string
}

const instantiateContract = async (
  data: Params
): Promise<InstantiateResult> => {
  const { initMsg, label, codeId, maxGas } = data

  const signingClient = await keplr.createSigningClient({
    maxGas,
  })

  try {
    return await signingClient.instantiate(codeId, initMsg, label)
  } catch (error) {
    throw error
  }
}

export type ExecuteContractParams<T> = {
  maxGas: string
  contractAddress: string
  handleMsg: T
}

const executeContract = async <T extends object>(
  params: ExecuteContractParams<T>
): Promise<ExecuteResult> => {
  const { handleMsg, contractAddress, maxGas } = params
  const signingClient = await keplr.createSigningClient({
    maxGas,
  })

  try {
    return await signingClient.execute(contractAddress, handleMsg)
  } catch (error) {
    throw error
  }
}

export { instantiateContract, executeContract }
