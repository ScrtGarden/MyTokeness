const truncateAddress = (
  address: string,
  startIndex = 13,
  endIndex = 6
): string => {
  const first = address.slice(0, startIndex)
  const last = address.slice(-endIndex)
  return `${first}...${last}`
}

export default truncateAddress
