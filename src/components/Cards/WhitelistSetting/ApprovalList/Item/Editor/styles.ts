import styled from 'styled-components'

const Cell = styled.td`
  background: #1f262d;
  padding: 0 ${(props) => props.theme.space.sm};
`

const Content = styled.div`
  border-top: 1px solid ${(props) => props.theme.border.color};
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.space.md} 0;
  row-gap: ${(props) => props.theme.space.md};
`

const Buttons = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Wrapper = styled.div`
  column-gap: ${(props) => props.theme.space.md};
  display: flex;
`

export { Cell, Content, Buttons, Wrapper }
