import { Navigate } from "react-router-dom"

import { IS_LOGGED_IN } from "../../utils/constants/constants"

export default function ProtectedRoute({element: Component, ...props}) {
  return (
    props.isLoggedIn ? Component : <Navigate to={`${localStorage.getItem(IS_LOGGED_IN) ? '#' : '/'}`}/>
  )
}
