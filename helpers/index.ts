import { AppContext } from 'next/app';
import atob from 'atob'
import Cookies from 'js-cookie'
import Cookie from 'cookie'

export const parseJwt = (token: string) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null
  }
};

type UserToken = {
  id: string,
  email: string
}

export const getTokenSSRANDCSR = (req: AppContext): [string, UserToken | null] => {
  let token = ''
  let userToken = null
  if (typeof window === 'undefined') {
    // SSR
    const cookieString = req.ctx.req.headers.cookie || ''
    token = Cookie.parse(cookieString).token
    userToken = token && parseJwt(token)
  } else {
    token = Cookies.get('token')
  }

  return [token, userToken]
}
