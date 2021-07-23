import axios, { Method } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const datahubProxyLCD = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { slug } = req.query as { slug: string[] }
  const route = slug.join('/')
  const url = process.env.DATAHUB_LCD_URL + route
  const method = req.method as Method
  const data = req.body
  const params = req.query

  try {
    const response = await axios({ url, method, data, params })
    res.send(response.data)
  } catch (error) {
    throw error
  }
}

const datahubProxyRPC = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { slug } = req.query as { slug: string[] }
  const route = slug.join('/')
  const url = process.env.DATAHUB_RPC_URL + route
  const method = req.method as Method
  const data = req.body
  const params = req.query

  try {
    const response = await axios({ url, method, data, params })
    res.send(response.data)
  } catch (error) {
    throw error
  }
}

export { datahubProxyLCD, datahubProxyRPC }
