/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { jsx, Label, Textarea } from 'theme-ui'

import TextMessage from './TextMessage'

interface TextAreaInputProps {
  id?: string
  label: string
  lcolor?: string
  name: string
  onChange?: () => void
  onBlur?: () => void
  placeholder?: string
  type?: string
}

const TextAreaInput = ({
  label,
  ...props
}: TextAreaInputProps): JSX.Element => {
  const [field, meta] = useField(props)

  return (
    <Fragment>
      <Label sx={{ color: `${props.lcolor}` }} htmlFor={props.id || props.name}>
        {label}{' '}
      </Label>
      <Textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <TextMessage type="error">{meta.error}</TextMessage>
      ) : null}
    </Fragment>
  )
}

export default TextAreaInput
