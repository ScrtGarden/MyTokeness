import { CosmWasmClient } from 'secretjs'

const queryClient = new CosmWasmClient(
  process.env.NEXT_PUBLIC_REST_URL as string
)

export { queryClient }
