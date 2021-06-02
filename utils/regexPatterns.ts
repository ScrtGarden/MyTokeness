// Only alphabetic chars and digits, up to 6 chars max.
const symbolPattern = /^[A-Za-z0-9]{0,6}$/

// Only integers, no leading zero
const decimalsPattern = /^([1-9][0-9]*)$/

// Only numbers, and amount of decimals is dynamic
const amountPattern = (decimals: number | string) =>
  `^\\d{1,}(\\.\\d{0,${decimals}})?$`

// Extract string between '{"generic_err"' and '}}' strings
const getErrorMsgPattern = /{"generic_err"\s*(.*?)\s*}}/g

// Get hash link
const hashLinkPattern = /(?<=ipfs:\/\/).+/

export {
  symbolPattern,
  decimalsPattern,
  amountPattern,
  getErrorMsgPattern,
  hashLinkPattern,
}
