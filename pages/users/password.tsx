import React, { useState } from 'react';
import { useAuthen } from '../../helpers/useAuthen';
import userService from '../../services/userService';
import { useGlobalState } from '../../state';

const initialState = {
  oldPassword: '',
  newPassword: '',
  reNewPassword: ''
}

const UserChangePassword = () => {
  useAuthen()
  const [token] = useGlobalState('token')
  const [formData, setFormData] = useState(initialState)

  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value

    setFormData({
      ...formData,
      [key]: value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    userService.changePassword(formData, token)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert('Thay đổi mật khẩu thành công!!!')
          setFormData(initialState)
        } else {
          alert(res.error)
        }
      })
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Đổi mật khẩu</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleOnSubmit}>
            <input 
              onChange={handleOnChange('oldPassword')} 
              value={formData.oldPassword}
              type="password" className="form-control" placeholder="Mật khẩu cũ" required />
            <input 
              onChange={handleOnChange('newPassword')} 
              value={formData.newPassword}
              type="password" className="form-control" placeholder="Mật khẩu mới" required />
            <input 
              onChange={handleOnChange('reNewPassword')} 
              value={formData.reNewPassword}
              type="password" className="form-control" placeholder="Xác nhận mật khẩu mới" required />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserChangePassword