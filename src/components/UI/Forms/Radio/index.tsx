import { Children, FC, ReactElement, cloneElement, memo } from 'react'

import { Container, Fill, Group, Input, Root } from './styles'
import { Label } from '..'

type RadioProps = {
  onChange?: () => void
  value: string
  labelText?: string
  checked?: boolean
  name?: string
  isRegular?: boolean
}

type RadioGroupProps = {
  name?: string
  selectedValue?: string
  onClick: (value: string) => void
}

const Radio: FC<RadioProps> = memo(
  ({ onChange, value, labelText, checked, name, isRegular }) => (
    <Container onClick={onChange}>
      <Root checked={checked}>
        <Input
          type="radio"
          onChange={onChange}
          name={name}
          value={value}
          checked={checked}
          aria-checked={checked}
        />
        <Fill />
      </Root>
      <Label isRegular={isRegular}>{labelText}</Label>
    </Container>
  )
)

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  selectedValue,
  onClick = () => null,
  children,
  ...rest
}) => (
  <Group role="radiogroup" {...rest}>
    {Children.map(children as JSX.Element, (element: ReactElement) =>
      cloneElement(element, {
        ...element.props,
        checked: selectedValue === element.props.value,
        onChange: () => onClick(element.props.value),
        name,
      })
    )}
  </Group>
)

export { Radio, RadioGroup }
