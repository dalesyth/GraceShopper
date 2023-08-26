import Home from "./home"
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  if(!localStorage.getItem("token")) {
    return < Home /> 
  }
  return children
}

export default ProtectedRoute