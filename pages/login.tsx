import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGlobalState } from '../state'
import { useNotAuthen } from '../helpers/useAuthen'
import Link from 'next/link'
import { Button } from '../components/Button'


interface FormLogin {
  email: string,
  password: string
}
const initFormData: FormLogin = {
  email: '',
  password: ''
}

export default function Login() {
  useNotAuthen()
  const router = useRouter()
  const [formData, setFormData] = useState<FormLogin>(initFormData)
  const errorString = router.query.error
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (errorString) {
      alert(errorString)
      window.history.pushState({}, document.title, "/login");
    }
  }, [])

  const onChange = (key) => (evt) => {
    // debugger
    const value = evt.target.value
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
  //   const config = {
  //     data: formData,
  //     method: 'POST'
  //   }
  //   const res = api
  //     .callJson('/member/login.php', config)
  //     .then(data => {
  //       console.log(data)
  //     })

    const body = JSON.stringify(formData)
    const method = 'POST'
    fetch('/api/login', { 
      body, 
      method, 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        // Cookies.set('token', data.token, { expires: 30 })
        // Cookies.remove('token')
        router.push('/')
      })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    const formElement = e.target

    // setTimeout(() => {
    //   formElement.submit()
    // }, 3000)

    formElement.submit()
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">Meme</a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          {/* <form action="#" onSubmit={onSubmit}> */}
          <form action="/api/login" method='POST' onSubmit={handleSubmitForm}>
            <input 
              type="text" 
              // value={formData.email} 
              // onChange={onChange('email')}
              name='email'
              className="form-control" 
              placeholder="Email" 
              required 
            />
            <div className="ass1-input-copy">
              <input 
                type="password" 
                // value={formData.password} 
                // onChange={onChange('password')}
                name='password'
                className="form-control" 
                placeholder="Mật khẩu" 
                required 
              />
              <a href="#">Copy</a>
            </div>
            <div className="ass1-login__send">
              <Link href='/register'>
                <a href="dang-ky.html">Đăng ký một tài khoản</a>
              </Link>
              <Button type="submit" className="ass1-btn" isLoading={loading}>Đăng nhập</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}