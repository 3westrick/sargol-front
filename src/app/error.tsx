"use client"
import React from 'react'

const error = ({error}: {error: Error}) => {
  return (
    <div>
      {error.message}
    </div>
  )
}

export default error
