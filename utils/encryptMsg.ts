import keplr from './keplr'

const encryptMsg = async (msg: unknown, codeHash: string): Promise<string> => {
  try {
    const utils = keplr.getEnigmaUtils(process.env.NEXT_PUBLIC_CHAIN_ID)
    const encrypted = await utils.encrypt(codeHash, msg)
    return Buffer.from(encrypted).toString('base64')
  } catch (error) {
    throw error
  }
}

export default encryptMsg
