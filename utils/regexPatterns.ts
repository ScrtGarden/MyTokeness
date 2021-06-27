// Only alphabetic chars up to 6 chars max.
const symbolPattern = /^[A-Za-z]{0,6}$/

// Only integers, between 1-100, no leading zero
const supplyPattern = /^[1-9]$|^[1-9][0-9]$|^(100)$/

// Number between 1-18
const decimalsPattern = /^(1[0-8]|[1-9])$/

// Only integers with leading zero
const blockheightPattern = /^(0|[1-9][0-9]*)$/

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
  blockheightPattern,
  supplyPattern,
}
