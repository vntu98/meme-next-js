import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { parseJwt } from '.'
import { useGlobalState } from '../state';

function useAuthen() {
  const [token] = useGlobalState('token')
  const router = useRouter();
  
  useEffect(() => {
    const userToken = parseJwt(token)
    if (!(userToken && userToken.id && userToken.email)) {
      router.push('/login')
    }
  }, [token])
}

function useNotAuthen() {
  const token = Cookies.get('token')
  const router = useRouter();
  
  useEffect(() => {
    const userToken = parseJwt(token)
    if (userToken && userToken.id && userToken.email) {
      router.push('/')
    }
  }, [token])
}

export {
  useAuthen,
  useNotAuthen
}