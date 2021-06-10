import { Stream } from 'stream'

const streamToBuffer = async (stream: Stream): Promise<Buffer> =>
  new Promise<Buffer>((resolve, reject) => {
    let _buf = Array<any>()

    stream.on('data', (chunk) => _buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(_buf)))
    stream.on('error', (err) => reject(`error converting stream - ${err}`))
  })

export default streamToBuffer
