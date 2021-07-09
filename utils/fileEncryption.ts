import crypto, { CipherKey } from 'crypto'

import base64 from 'base64-js'

import { ipfs } from './ipfs'

const algorithm = 'aes-256-ctr'

const createCipherKey = (text: string): CipherKey =>
  crypto
    .createHash('sha256')
    .update(String(text))
    .digest('base64')
    .substr(0, 32)

const encrypt = (buffer: Buffer, key: string): Buffer => {
  // Create an initialization vector
  const iv = crypto.randomBytes(16)

  // Create cipherKey
  const cipherKey = createCipherKey(key)

  // Create a new cipher using the algorithm, key, and iv
  const cipher = crypto.createCipheriv(algorithm, cipherKey, iv)

  // Create the new (encrypted) buffer
  return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
}

const decrypt = (encrypted: Buffer, key: string): Buffer => {
  // Get the iv: the first 16 bytes
  const iv = encrypted.slice(0, 16)

  // Get the rest
  encrypted = encrypted.slice(16)

  // Create cipherKey
  const cipherKey = createCipherKey(key)

  // Create a decipher
  const decipher = crypto.createDecipheriv(algorithm, cipherKey, iv)

  // Actually decrypt it
  return Buffer.concat([decipher.update(encrypted), decipher.final()])
}

const decryptFile = async (url: string, key: string): Promise<string> => {
  try {
    const stream = ipfs.cat(url)
    const result: Uint8Array[] = []
    for await (const chunk of stream) {
      result.push(chunk)
    }
    const buffer = Buffer.concat(result)
    const decryptedBuffer = decrypt(buffer, key)
    return base64.fromByteArray(decryptedBuffer)
  } catch (error) {
    console.log('Unable to decrypt file.')
    throw error
  }
}

export { encrypt, decrypt, decryptFile }
