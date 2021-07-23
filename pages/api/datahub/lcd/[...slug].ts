import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { datahubProxyLCD } from '../../../../utils/datahubProxy'

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(datahubProxyLCD)
  .post(datahubProxyLCD)

export default handler
