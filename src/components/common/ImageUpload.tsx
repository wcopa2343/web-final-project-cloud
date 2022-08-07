/** @jsxRuntime classic */
/** @jsx  jsx */

import { Fragment, useState } from 'react'
import { Container, Image, jsx, Text } from 'theme-ui'

import plus from '../../assets/plus.svg'
import TextMessage from './TextMessage'

let counter = 0

interface dndProps {
  children: React.ReactNode
  className?: string
  onDragEnter: (event: React.DragEvent) => void
  onDragLeave: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent) => void
  size?: number
}

interface imageInput {
  alt: string
  fromChild: (local: File) => void
  size?: number
  children?: React.ReactNode
}

const DndContainer = (props: dndProps): JSX.Element => {
  return (
    <Container
      {...props}
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: props.size ? `40vh` : '70vh',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        width: '100%',
        zIndex: 9999,
      }}
    >
      {props.children}
    </Container>
  )
}

function ImageUpload({
  alt,
  fromChild,
  size,
  ...props
}: imageInput): JSX.Element {
  const [data, setData] = useState<string>(alt)
  const [error, setError] = useState<string | boolean>(false)
  const [overlay, setOverlay] = useState(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const {
      dataTransfer: { files },
    } = e

    const { length } = files
    const reader: FileReader = new FileReader()

    if (length === 0) {
      return false
    }

    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const { size, type } = files[0]
    setData('')

    if (!fileTypes.includes(type)) {
      setError('The image format should be either png or jpg')
      return false
    }

    if (size / 1024 / 1024 > 5) {
      setError('File Size is bigger than 5Mb')
      setOverlay(false)
      return false
    }

    setError(false)
    setOverlay(false)

    reader.readAsDataURL(files[0])
    reader.onload = loadImage => {
      setData((loadImage.target as FileReader).result as string)
    }

    fromChild(files[0])
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    counter++
    setOverlay(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    counter--
    if (counter === 0) {
      setOverlay(false)
    }
  }

  return (
    <Fragment>
      <DndContainer
        {...props}
        onDrop={e => onDrop(e)}
        onDragOver={e => onDragOver(e)}
        onDragEnter={e => onDragEnter(e)}
        onDragLeave={e => onDragLeave(e)}
        size={size}
      >
        {error ? (
          <TextMessage sx={{ fontSize: 5 }} type="error">
            {error}
            <br />
            Choose another file
          </TextMessage>
        ) : overlay && data ? (
          <Image
            {...props}
            src={data}
            variant={size ? 'profile' : 'fullwidth'}
          />
        ) : overlay ? (
          <Text sx={{ color: 'orange', fontSize: 7 }} variant="title">
            Drop it!
          </Text>
        ) : data ? (
          <Image
            {...props}
            src={data}
            variant={size ? 'profile' : 'fullwidth'}
          />
        ) : (
          <Image width={'65px'} src={plus} />
        )}
      </DndContainer>
    </Fragment>
  )
}

export default ImageUpload
