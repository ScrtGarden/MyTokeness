import { FC, memo, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { FILE_UPLOADER } from '../../../../../utils/constants'
import MessageWithIcon from '../../../Common/MessageWithIcon'
import Icon from '../../../Icons'
import { Field, Hint, Input, Label } from '../../../UI/Forms'
import Instruction from './FileUploadContent/Instruction'
import Preview from './FileUploadContent/Preview'
import { CloseButton, StyledFileUpload, Wrapper } from './styles'

type Props = {
  file?: File
  label?: string
  setFile: (file?: File) => void
  error?: string
}

const FileUploader: FC<Props> = ({ file, label, setFile, error }) => {
  const preview = useMemo(
    () =>
      file ? { src: URL.createObjectURL(file), type: file.type } : undefined,
    [file]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setFile(file)
      }
    },
    [setFile]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: FILE_UPLOADER.ACCEPTS,
    maxSize: FILE_UPLOADER.MAX_SIZE,
    maxFiles: 1,
  })

  return (
    <Field>
      <Label>{label || 'Image, Video or Audio'}</Label>
      <Hint>Acceptable formats are JPG, PNG, GIF, MP3 and MP4. Max 50MB.</Hint>
      <Wrapper>
        {preview && (
          <CloseButton onClick={() => setFile()} isDanger>
            <Icon name="times" />
          </CloseButton>
        )}
        <StyledFileUpload
          {...getRootProps()}
          isDragging={isDragActive}
          validation={error ? 'error' : undefined}
        >
          {!preview ? (
            <Instruction
              isDragActive={isDragActive}
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
            />
          ) : (
            <Preview src={preview.src} type={preview.type} />
          )}
          <Input {...getInputProps()} />
        </StyledFileUpload>
      </Wrapper>
      {error && <MessageWithIcon validation="error" message={error} />}
    </Field>
  )
}

export default memo(FileUploader)
