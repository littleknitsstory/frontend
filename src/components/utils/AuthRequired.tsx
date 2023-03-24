import { Navigate, Outlet } from "react-router-dom"
import jwtDecode from "jwt-decode"
import { useRefreshTokenMutation } from "../features/api/apiSlice";

interface IJwtDecode {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

const AuthRequired = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens") || "{}")
  const [ refreshTokenCall ] = useRefreshTokenMutation()

  if (!tokens.access) {
    return <Navigate to="/login/" />
  }
  try {
    const decodedJWT: IJwtDecode = jwtDecode(tokens.access, { header: true })
    const isTokenExpired = decodedJWT.exp * 1000 < Date.now()
    
    const updateToken = async (token: string) => {
      try {
        const payload = await refreshTokenCall(token).unwrap()
        localStorage.setItem("tokens", JSON.stringify({ access: payload.access, refresh: tokens.refresh  }))
      }
      catch (error) {
        localStorage.removeItem("tokens")
      }
    }
    
    if (isTokenExpired) {
      updateToken(tokens.access)
    }

  } catch (error) {
    localStorage.removeItem("tokens")
    return <Navigate to="/login/" />
  }

  return <Outlet />
}
export default AuthRequired