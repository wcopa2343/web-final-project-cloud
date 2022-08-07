/** @jsxRuntime classic */
/** @jsx  jsx */

import { jsx } from 'theme-ui'

interface ChipProps {
  label: string
  id: number
  name: string
  removeChip?: (indexToRemove: number) => void
  color: string
  fontSize?: string
  outline: boolean
}

function Chip({ ...props }: ChipProps): JSX.Element {
  return (
    <li
      key={props.id}
      sx={{
        backgroundColor: `${props.outline ? 'white' : props.color}`,
        border: `${props.outline ? '1' : '0'}px solid ${props.color}`,
        color: `${props.outline ? props.color : 'white'}`,
        fontSize: props.fontSize,
        variant: 'chips.content',
      }}
    >
      <span>{props.label}</span>
      {props.removeChip ? (
        <span
          data-testid="chipButton"
          sx={{ variant: 'chips.removeButton' }}
          onClick={() => {
            if (props.removeChip) {
              props.removeChip(props.id)
            }
          }}
        >
          +
        </span>
      ) : null}
    </li>
  )
}

export default Chip
