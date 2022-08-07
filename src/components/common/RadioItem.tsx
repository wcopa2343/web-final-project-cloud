/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { Fragment } from 'react'
import { jsx, Label, Radio } from 'theme-ui'

interface RadioItemProps {
  color?: string
  defaultChecked?: boolean
  id?: string
  label: string
  name: string
  onChange?: () => void
  onBlur?: () => void
  type?: string
  value: string
}

const RadioItem = ({ color, label, ...props }: RadioItemProps): JSX.Element => {
  const [field] = useField(props)

  return (
    <Fragment>
      <Label>
        <Radio sx={{ color }} {...field} {...props} /> {label}
      </Label>
    </Fragment>
  )
}

export default RadioItem
