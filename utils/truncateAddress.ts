const truncateAddress = (
  address: string,
  startIndex: number = 13,
  endIndex = 6
) => {
  if (address) {
    const first = address.slice(0, startIndex)
    const last = address.slice(-endIndex)
    return `${first}...${last}`
  }
}

export default truncateAddress
