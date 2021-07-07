import { ExecuteResult, InstantiateResult } from 'secretjs'

import keplr from './keplr'

export type Params<T> = {
  initMsg: T
  label: string
  codeId: number
  maxGas: string
}

const instantiateContract = async <T extends Record<string, unknown>>(
  data: Params<T>
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

const executeContract = async <T extends Record<string, unknown>>(
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
