/** @jsxRuntime classic */
/** @jsx  jsx */

import { useField } from 'formik'
import { ChangeEvent, Fragment, KeyboardEvent, useState } from 'react'
import { Flex, Input, jsx, Label } from 'theme-ui'

import Chip from './Chip'
import TextMessage from './TextMessage'

interface ChipInputProps {
  chips: string[]
  id?: string
  label: string
  max: number
  name: string
  onBlur?: () => void
  onChange?: () => void
  placeholder?: string
  type?: string
  value?: string
  removeChip: (indexToRemove: number) => void
  addChip: (chips: string[]) => void
}

function ChipInput({ label, ...props }: ChipInputProps): JSX.Element {
  const [field, meta, helpers] = useField(props)
  const [currentChip, setCurrentChip] = useState('')
  const KEYS = {
    backspace: 'Backspace',
    comma: ',',
    enter: 'Enter',
  }
  const onAdd = (
    event: KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>,
  ) => {
    if (!meta.error) {
      const keyPressed = event.key
      const value = event.target.value
      if (keyPressed === KEYS.enter || (keyPressed === KEYS.comma && value)) {
        event.preventDefault()
        const values = value.split(',').map((chip: string) => chip.trim())
        const toBeAdded = values.filter(
          (chip: string, i: number) =>
            !isInList(chip) && values.indexOf(chip) === i && isValid(chip),
        )
        while (props.chips.length + toBeAdded.length > props.max) {
          toBeAdded.pop()
        }
        props.addChip(toBeAdded)
        setCurrentChip('')
      } else if (keyPressed === KEYS.backspace) {
        if (!value && props.chips.length) {
          const indexToRemove = props.chips.length - 1
          props.removeChip(indexToRemove)
        }
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentChip(event.target.value)
    helpers.setValue(event.target.value)
  }

  const isInList = (chip: string) => {
    return props.chips.includes(chip)
  }

  const isValid = (chip: string) => {
    return chip.length >= 2 && chip.length <= 50 && chip
  }

  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input
        {...field}
        {...props}
        onKeyDown={onAdd}
        value={currentChip}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <TextMessage type="error">{meta.error}</TextMessage>
      ) : null}
      <Flex sx={{ flexWrap: 'wrap', marginY: '5px' }}>
        {props.chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            id={index}
            name={chip}
            color="gray"
            outline={true}
            removeChip={props.removeChip}
          />
        ))}
      </Flex>
    </Fragment>
  )
}

export default ChipInput
