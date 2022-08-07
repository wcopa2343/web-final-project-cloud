import React from 'react'
import AwesomeSlider from 'react-awesome-slider'
import { Box, Container, Flex } from 'theme-ui'

import light from '../assets/logo/light.svg'
import circuit from '../assets/patterns/circuit.svg'
import { SlideContainer } from './common/SlideContainer'

import 'react-awesome-slider/dist/styles.css'
import '../styles/sliderStyles.css'

const Home = (): JSX.Element => {
  return (
    <Flex sx={{ justifyContent: 'flex-start' }}>
      <Box
        variant="noMargin"
        sx={{
          backgroundColor: 'green',
          height: '815px',
          marginTop: '-100px',
          position: 'relative',
          width: '35%',
          zIndex: 2,
        }}
      >
        <Container
          sx={{
            bottom: 0,
            position: 'absolute',
            right: 0,
            width: '80%',
          }}
        >
          <img alt="Logo" src={'https://www.uagrm.edu.bo/img/uagrm-escudo_886x1130.png'} width='300' />
        </Container>
      </Box>
      <Box
        sx={{
          height: '715px',
          justifyContent: 'center',
          position: 'relative',
          width: '65%',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            bottom: 200,
            height: '480px',
            left: 0,
            margin: 'auto',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '890px',
          }}
        >
          <AwesomeSlider fillParent={true}>
            <Box>
              <SlideContainer
                image="https://res.cloudinary.com/dbwef4fdy/image/upload/v1610553217/userImages/slider1_fxirls.png"
                imageName="slide1"
                slideTitle="Take Part in our tech events"
                summary="Join us and learn from experts of multiple areas of expertise, as you pave your way into excellence!"
              ></SlideContainer>
            </Box>
            <Box>
              <SlideContainer
                image="https://res.cloudinary.com/dbwef4fdy/image/upload/v1610553217/userImages/slider1_fxirls.png"
                imageName="slide1"
                slideTitle="Prepare yourself for new challenges"
                summary="Stay in the vanguard of technology by learning the newest topics of computer science!"
              ></SlideContainer>
            </Box>
            <Box>
              <SlideContainer
                image="https://res.cloudinary.com/dbwef4fdy/image/upload/v1610553217/userImages/slider1_fxirls.png"
                imageName="slide1"
                slideTitle="Acquire value from us"
                summary="You will be granted a certificate once the event is finished!"
              ></SlideContainer>
            </Box>
          </AwesomeSlider>
        </Box>
        <Container
          variant="noMargin"
          sx={{
            backgroundImage: `url(${circuit})`,
            bottom: 0,
            height: '19vh',
            opacity: '0.5',
            position: 'absolute',
          }}
        ></Container>
      </Box>
    </Flex>
  )
}

export default Home
