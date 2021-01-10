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

export const getTokenSSRANDCSR = (cookieString = ''): [string, UserToken | null] => {
  let token = ''
  let userToken = null
  if (typeof window === 'undefined') {
    // SSR
    token = Cookie.parse(cookieString).token
    userToken = token && parseJwt(token)
  } else {
    token = Cookies.get('token')
  }

  return [token, userToken]
}

export const validateEmail = (email: string):boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return re.test(email);
}

export const highlightText = (originStr: string, queryStr: string) => {
  const indexStart = originStr.toLowerCase().indexOf(queryStr.toLocaleLowerCase())

  if (indexStart === -1) return originStr

  const beforeStr = originStr.substring(0, indexStart)
  const middle = originStr.substring(beforeStr.length, beforeStr.length + queryStr.length)
  const afterStr = originStr.substring(beforeStr.length + queryStr.length)

  return beforeStr + '<mark>' + middle + '</mark>' + afterStr
}
