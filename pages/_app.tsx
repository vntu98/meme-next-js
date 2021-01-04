import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/style.css'

import Head from 'next/head'
import App from 'next/app'
import es6Promise from 'es6-promise'

import { AppContext, AppProps } from 'next/app'
import { useMemo } from 'react'

import AppHeader from '../components/Header'
import { Footer } from '../components/Footer'
import { getTokenSSRANDCSR } from '../helpers'
import userService from '../services/userService'
import { useGlobalState } from '../state'

es6Promise.polyfill()

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathName = router.pathname
  const [currentUser, setCurrentUser] = useGlobalState('currentUser')
  const [, setToken] = useGlobalState('token')

  useMemo(() => {
    setToken(pageProps.token)
    setCurrentUser(pageProps.userInfo)
  }, [])

	const hiddenFooter = useMemo(() => {
    const excluded = ['/', '/posts/[postId]'];
    const currentRouter = router.pathname

		return excluded.indexOf(currentRouter) !== -1
	}, [pathName])

	const hiddenHeader = useMemo(() => {
		const excluded = ['/login', '/register'];
		const currentRouter = router.pathname
		
		return excluded.indexOf(currentRouter) !== -1
	}, [pathName])

  return (
		<div id='root'>
			<Head>
				<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh" />
        <meta name="author" content="etheme.com" />
        <title>Cộng đồng chế ảnh</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{
				!hiddenHeader && <AppHeader />
			}

			<main>
				<Component {...pageProps} />
			</main>

			{
				!hiddenFooter && <Footer />
			}
		</div>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let userRes = null
  let [token, userToken] = getTokenSSRANDCSR(appContext)
  const appProps = await App.getInitialProps(appContext);
  if (typeof window === 'undefined') {
    // SSR
    if (userToken && userToken.id) {
      userRes = await userService.getUserById(userToken.id)
    }
  }
  console.log(token)

  return { 
		pageProps: {
      ...appProps.pageProps,
      token,
      userInfo: userRes && userRes.user
		}
	}
}
  
export default MyApp