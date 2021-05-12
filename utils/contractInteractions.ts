import { InstantiateResult } from 'secretjs'

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

// export type ExecuteContractParams = {
//   maxGas: string
//   contractAddress: string
//   handleMsg: HandleMsg
// }

// interface ExecuteContractResponse extends Partial<ExecuteResult> {
//   error?: Error
// }

// /**
//  * contract execution function
//  */

// const executeContract = async (
//   params: ExecuteContractParams
// ): Promise<ExecuteContractResponse> => {
//   const { handleMsg, contractAddress, maxGas } = params
//   const { secretjs } = await keplr.createSigningClient({
//     maxGas,
//   })

//   try {
//     const response = await secretjs?.execute(contractAddress, handleMsg)
//     return { ...response }
//   } catch (error) {
//     throw error
//   }
// }

export { instantiateContract }
