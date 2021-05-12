type ErrorObj = { message?: string } | undefined

const parseErrorMsg = (error: Error) => {
  const { message } = error

  if (message.includes('out of gas')) {
    return 'You ran out of gas.'
  }

  return message || 'Something went wrong. Please try again later.'
}

export default parseErrorMsg
