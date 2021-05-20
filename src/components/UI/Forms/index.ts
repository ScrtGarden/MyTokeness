import styled from 'styled-components'

import Icon from '../../Icons'

type Validation = 'error' | 'success' | 'warning'

export interface InputProps {
  readonly validation?: Validation
  readonly isCompact?: boolean
  readonly uppercase?: boolean
}

interface FileUploadProps {
  readonly isDragging?: boolean
  readonly validation?: Validation
}

interface MessageProps {
  readonly validation?: Validation
}

interface MessageIconProps {
  readonly validation?: Validation
}

interface LabelProps {
  readonly isRegular?: boolean
  readonly disabled?: boolean
}

interface HintProps {
  disabled?: boolean
}

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Label = styled.label<LabelProps>`
  color: ${(props) =>
    props.disabled
      ? props.theme.font.colors.disabled
      : props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) =>
    props.isRegular
      ? props.theme.font.weights.regular
      : props.theme.font.weights.semibold};
`

const Hint = styled.p<HintProps>`
  color: ${(props) =>
    props.disabled
      ? props.theme.font.colors.disabled
      : props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.sm};
  line-height: ${(props) => props.theme.font.lineHeights.md};
  margin-bottom: 0;
  margin-top: ${(props) => props.theme.space.xxs};
`

const Textarea = styled.textarea<InputProps>`
  appearance: none;
  background-color: ${(props) => props.theme.forms.input.bg.default};
  border: 1px solid ${(props) => props.theme.forms.input.border.color.default};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  line-height: ${(props) => props.theme.font.lineHeights.md};
  padding: ${(props) => `${props.theme.space.sm} ${props.theme.space.sm}`};
  outline: none;
  resize: vertical;
  transition: border-color 0.25s ease-in-out 0s, box-shadow 0.1s ease-in-out 0s,
    background-color 0.25s ease-in-out 0s, color 0.25s ease-in-out 0s;
  width: 100%;

  ${(props) =>
    props.validation === 'error' &&
    `border-color: ${props.theme.forms.input.border.color.defaultError}`};

  :hover {
    border-color: ${(props) => props.theme.forms.input.border.color.hover};

    ${(props) =>
      props.validation === 'error' &&
      `border-color:  ${props.theme.forms.input.border.color.hoverError}`};
  }

  :focus {
    border-color: ${(props) => props.theme.forms.input.border.color.focus};
    box-shadow: ${(props) => props.theme.forms.input.shadow.color.focus} 0px 0px
      0px 3px;

    ${(props) =>
      props.validation === 'error' &&
      `
        border-color: ${props.theme.forms.input.border.color.focusError};
        box-shadow: ${props.theme.forms.input.shadow.color.focusError} 0px 0px
          0px 3px;
    `};
  }

  ${Field}:not([hidden]) & {
    margin-top: ${(props) => props.theme.space.sm};
  }

  ::placeholder {
    color: ${(props) => props.theme.forms.input.placeholder.color};
  }
`

const InputGroup = styled.div`
  display: inline-flex;
  position: relative;
  flex-wrap: nowrap;
  align-items: stretch;
  z-index: 0;
  width: 100%;

  ${Field}:not([hidden]) & {
    margin-top: 10px;
  }

  & > *:first-child:not(:last-child) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  & > *:last-child:not(:first-child) {
    border-left: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`

const Input = styled.input<InputProps>`
  appearance: none;
  background-color: ${(props) => props.theme.forms.input.bg.default};
  border: 1px solid ${(props) => props.theme.forms.input.border.color.default};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  height: ${(props) => (props.isCompact ? '34px' : '40px')};
  padding: ${(props) => `0 ${props.theme.space.sm}`};
  outline: none;
  ${(props) => props.uppercase && 'text-transform: uppercase'};
  transition: border-color 0.25s ease-in-out 0s, box-shadow 0.1s ease-in-out 0s,
    background-color 0.25s ease-in-out 0s, color 0.25s ease-in-out 0s;
  width: 100%;

  ${(props) =>
    props.validation === 'error' &&
    `border-color: ${props.theme.forms.input.border.color.defaultError}`};

  :hover {
    border-color: ${(props) => props.theme.forms.input.border.color.hover};

    ${(props) =>
      props.validation === 'error' &&
      `border-color:  ${props.theme.forms.input.border.color.hoverError}`};
  }

  :focus {
    border-color: ${(props) => props.theme.forms.input.border.color.focus};
    box-shadow: ${(props) => props.theme.forms.input.shadow.color.focus} 0px 0px
      0px 3px;

    ${(props) =>
      props.validation === 'error' &&
      `
        border-color: ${props.theme.forms.input.border.color.focusError};
        box-shadow: ${props.theme.forms.input.shadow.color.focusError} 0px 0px
          0px 3px;
    `};
  }

  ::placeholder {
    color: ${(props) => props.theme.forms.input.placeholder.color};
  }

  ${Field}:not([hidden]) & {
    margin-top: 10px;
  }

  ${InputGroup}:not([hidden]) & {
    margin-top: 0px;

    :focus {
      box-shadow: inset ${(props) => props.theme.forms.input.shadow.color.focus}
        0px 0px 0px 3px;
    }
  }
`

const FileUpload = styled.div<FileUploadProps>`
  background-color: ${(props) =>
    props.isDragging
      ? props.theme.forms.fileUpload.bg.active
      : props.theme.forms.fileUpload.bg.default};
  border: 2px dashed
    ${(props) => props.theme.forms.fileUpload.border.color.default};
  border-radius: ${(props) => props.theme.border.radii.md};
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease-in-out,
    border-color 0.25s ease-in-out 0s;

  ${(props) =>
    props.validation === 'error' &&
    `border-color: ${props.theme.forms.fileUpload.border.color.error}`};

  :hover {
    background-color: ${(props) => props.theme.forms.fileUpload.bg.hover};
  }

  :active {
    background-color: ${(props) => props.theme.forms.fileUpload.bg.active};
  }
`

const Message = styled.p<MessageProps>`
  color: ${(props) => props.theme.font.colors.secondary};
  font-size: ${(props) => props.theme.font.sizes.sm};
  margin: 0;

  ${(props) =>
    props.validation === 'error' && `color: ${props.theme.font.colors.error}`};
`

const MessageIcon = styled(Icon)<MessageIconProps>`
  fill: ${(props) => props.theme.icon.colors.secondary};
  height: 1.6rem;
  width: 1.6rem;

  ${(props) =>
    props.validation === 'error' && `fill: ${props.theme.icon.colors.error}`};
`

const MessageWrapper = styled.div`
  align-items: center;
  column-gap: ${(props) => props.theme.space.xs};
  display: flex;
  margin-top: ${(props) => props.theme.space.xs};
`

const Symbol = styled.div`
  align-items: center;
  background: ${(props) => props.theme.forms.symbol.bg};
  border-radius: 4px;
  color: #181e24;
  display: flex;
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  height: 40px;
  justify-content: center;
  padding: 0 ${(props) => props.theme.space.sm};
  position: relative;
  min-width: 40px;
`

const Select = styled.select`
  appearance: none;
  background-color: ${(props) => props.theme.forms.input.bg.default};
  border: 1px solid ${(props) => props.theme.forms.input.border.color.default};
  border-radius: ${(props) => props.theme.forms.input.border.radius};
  color: ${(props) => props.theme.font.colors.primary};
  font-size: ${(props) => props.theme.font.sizes.md};
  font-weight: ${(props) => props.theme.font.weights.semibold};
  height: 40px;
  padding: ${(props) => `0 ${props.theme.space.sm}`};

  :focus {
    outline: none;
  }
`

const Option = styled.option``

export {
  Field,
  Hint,
  Label,
  Textarea,
  Input,
  FileUpload,
  Message,
  MessageIcon,
  MessageWrapper,
  InputGroup,
  Symbol,
  Select,
  Option,
}
