import React, { Fragment } from 'react'

import Presentation from '../components/Presentation'
import Statistics from '../components/Statistics'

function Home(): JSX.Element {
  return (
    <Fragment>
      <Presentation />
      <Statistics />
    </Fragment>
  )
}

export default Home
