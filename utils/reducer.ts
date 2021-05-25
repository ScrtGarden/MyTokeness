const reducer = <T>(prevState: T, updatedProperty: Partial<T>) => ({
  ...prevState,
  ...updatedProperty,
})

export default reducer
