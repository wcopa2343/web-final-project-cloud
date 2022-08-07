/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from 'theme-ui'

import Footer from '../Footer'
import Header from '../Header'

interface propTypes {
  children: React.ReactNode
  className?: string
}

function LayoutTemplate(props: propTypes): JSX.Element {
  return (
    <div>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <main
          sx={{
            flex: '1 1 auto',
            margin: 0,
            padding: 0,
            width: '100%',
          }}
        >
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutTemplate
