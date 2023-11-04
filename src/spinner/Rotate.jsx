import React from 'react'
import { Oval } from  'react-loader-spinner'

function Rotate() {
  return (
    <Oval
        height={30}
        width={30}
        color="#0000FF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#ededed"
        strokeWidth={4}
        strokeWidthSecondary={4}
        
        />
  )
}

export default Rotate