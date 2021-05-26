import styled from 'styled-components'

interface TagProps {
  readonly color?: string
}

const Tag = styled.div<TagProps>`
  align-items: center;
  background: ${(props) => props.theme.tags.bg.default};
  border-radius: 500px;
  color: ${(props) => props.theme.tags.color};
  display: flex;
  font-size: ${(props) => props.theme.font.sizes.sm};
  font-weight: ${(props) => props.theme.font.weights.bold};
  height: 20px;
  padding: 0 ${(props) => props.theme.space.xs};

  ${(props) =>
    props.color === 'blue' &&
    `
    background: ${props.theme.palette.blue[600]};
  `}
`

export { Tag }
