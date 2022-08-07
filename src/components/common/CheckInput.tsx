/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { Checkbox, jsx, Label } from 'theme-ui'

interface CheckInputProps {
  color?: string
  id?: string
  label: string
  name: string
  onChange?: () => void
  onBlur?: () => void
  type?: string
}

const CheckInput = ({
  color,
  label,
  ...props
}: CheckInputProps): JSX.Element => {
  const [field] = useField(props)

  return (
    <Fragment>
      <Label>
        <Checkbox sx={{ color }} {...field} {...props} /> {label}
      </Label>
    </Fragment>
  )
}

export default CheckInput
