import React, { useState } from 'react'

const Abdullah = () => {
  const  name =  localStorage.getItem("name")
  const email = localStorage.getItem("email")
  return (
    <div>
      <h1>{name}</h1>
      <h1>{email}</h1>
    </div>
  )
}

export default Abdullah
