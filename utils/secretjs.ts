import { CosmWasmClient } from 'secretjs'

const queryChain = new CosmWasmClient(
  process.env.NEXT_PUBLIC_REST_URL as string
)

export { queryChain }
