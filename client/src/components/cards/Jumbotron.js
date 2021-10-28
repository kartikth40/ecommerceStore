import React from 'react'
import Typewriter from 'typewriter-effect'

const Jumbotron = ({ textArray }) => (
  <Typewriter
    options={{
      strings: textArray,
      autoStart: true,
      loop: true,
    }}
  />
)

export default Jumbotron
