import * as React from "react"
import { NavLink } from "react-router-dom"
import { useCursor } from "./Cursor"

const ExtendedLink = ({ onMouseEnter, onMouseLeave, ...rest }) => {
  const { setStatus } = useCursor()
  return (
    <NavLink
      onMouseEnter={() => {
        setStatus("hover")
        onMouseEnter()
      }}
      onMouseLeave={() => {
        setStatus(null)
        onMouseLeave()
      }}
      {...rest}
    />
  )
}

export default ExtendedLink
