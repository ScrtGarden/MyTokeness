interface Token {
  codeId?: number
  symbol: string
  name: string
  label?: string
  decimals: number
}

interface Tokens {
  TESTNET: Record<string, Token>
  MAINNET: Record<string, Token>
}

const TOKENS: Tokens = {
  TESTNET: {
    native: {
      symbol: 'SCRT',
      name: 'SSCRT',
      decimals: 6,
    },
    secret1s7c6xp9wltthk5r6mmavql4xld5me3g37guhsx: {
      codeId: 94,
      symbol: 'SSCRT',
      name: 'SSCRT',
      label: 'sscrt',
      decimals: 6,
    },
    secret1sxr4sq3ejp8eh0780wdxjjqd3tcyxgr2lyy5m6: {
      codeId: 94,
      symbol: 'ONE',
      name: 'ONE',
      label: 'Private One - 1819341c6225602',
      decimals: 6,
    },
    secret1e05fm04d5kulkgr4attqltnkmkfk7dhrnar89x: {
      codeId: 29215,
      symbol: 'MYDAI',
      name: 'MYDAI',
      label: 'MyTokeness Dai - 17f6d832c27f83e',
      decimals: 18,
    },
    secret1arpu37fn0qavhfy4auk7k4ulv40c6naztxwkpj: {
      codeId: 29215,
      symbol: 'MYUSDT',
      name: 'MYUSDT',
      label: 'MyTokeness USDT - 53180dac3cb6451',
      decimals: 18,
    },
  },
  MAINNET: {},
}

export default TOKENS
