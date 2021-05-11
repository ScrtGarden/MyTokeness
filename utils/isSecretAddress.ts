import { bech32 } from 'bech32'

const isSecretAddress = (address: string): boolean => {
  try {
    const result = bech32.decode(address)
    return result.prefix === 'secret'
  } catch (error) {
    return false
  }
}

export default isSecretAddress
