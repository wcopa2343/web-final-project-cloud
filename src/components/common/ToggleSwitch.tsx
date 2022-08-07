/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Label } from 'theme-ui'

interface ToggleSwitchProps {
  isToggled: boolean
  onToggle: () => void
}

function ToggleSwitch({ isToggled, onToggle }: ToggleSwitchProps): JSX.Element {
  const sliderStyles = isToggled
    ? {
        backgroundColor: 'green',
        transition: '0.4s',
        ':before': {
          transform: 'translateX(20px)',
        },
      }
    : undefined

  return (
    <Label sx={{ variant: 'toggleSwitches.content' }}>
      <input
        checked={isToggled}
        onChange={onToggle}
        sx={{ variant: 'toggleSwitches.input' }}
        type="checkbox"
      />
      <span sx={{ variant: 'toggleSwitches.slider', ...sliderStyles }} />
    </Label>
  )
}
export default ToggleSwitch
