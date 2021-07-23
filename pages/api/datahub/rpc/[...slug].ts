import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { datahubProxyRPC } from '../../../../utils/datahubProxy'

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(datahubProxyRPC)
  .post(datahubProxyRPC)

export default handler
