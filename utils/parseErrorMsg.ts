import { getErrorMsgPattern } from './regexPatterns'

const parseErrorMsg = (error: Error) => {
  const { message } = error

  const result = message.match(getErrorMsgPattern)
  if (result) {
    const parsed = JSON.parse(result[0])
    return parsed.generic_err.msg
  }

  if (message.includes('out of gas')) {
    return 'You ran out of gas.'
  }

  return message || 'Something went wrong. Please try again later.'
}

export default parseErrorMsg
