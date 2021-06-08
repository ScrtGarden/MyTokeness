import styled from 'styled-components'

interface TitleProps {
  readonly red?: boolean
  readonly green?: boolean
  readonly yellow?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.space.xxs};
`

const Field = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.xs};
  display: flex;
  flex-direction: row;
`

const Title = styled.div<TitleProps>`
  color: #fff;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};

  ${(props) => props.red && 'color: #d95468'};
  ${(props) => props.green && 'color: #60af73'};
  ${(props) => props.yellow && 'color: #f0be72'};
`

const Label = styled.label`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.md};
  /* font-weight: ${(props) => props.theme.font.weights.semibold}; */
`

const Text = styled.div`
  font-size: ${(props) => props.theme.font.sizes.md};
`

export { Container, Field, Label, Text, Title }
