import { Redirect } from 'expo-router'
import React from 'react'

const index = () => {
  return (
    <Redirect href={'(schedule)/01'} />
  )
}

export default index