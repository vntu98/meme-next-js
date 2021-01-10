import { useState, useRef } from "react"
import userService from "../../services/userService"
import { useGlobalState } from "../../state"

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useGlobalState('currentUser')
  const inputFileEl = useRef(null)
  const [user, setUser] = useState(currentUser)
  const [objFile, setObjFile] = useState({ file: null, base64URL: ''})
  const [token] = useGlobalState('token')

  const handleOnChange = (key: string) => (e:any) => {
    const value = e.target.value
    setUser({
      ...user,
      [key]: value
    })
  }

  const handleClickSelectFile = () => {
    inputFileEl.current.click()
  }

  const handleChangeFile = (e) => {
    const listFiles = e.target.files

    if (listFiles.length === 0) return

    const file = listFiles[0] as File

    if ((/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        // convert image file to base64 string
        setObjFile({
          file,
          base64URL: reader.result as string
        })
      }, false);

      reader.readAsDataURL(file);
    } else {
      alert('File không hợp lệ!!!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      fullname: user.fullname,
      gender: user.gender,
      description: user.description,
      avatar: objFile.file
    }
    userService.updateProfile(data, token)
      .then(res => {
        if (res.status === 200) {
          setCurrentUser(res.user)
          alert('Thay đổi thông tin thành công!!!')
        } else {
          alert(res.error)
        }
      })
  }

  const avatarURL = objFile.base64URL || user.profilepicture || '/images/avatar-02.png'

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div className="avatar" onClick={handleClickSelectFile}>
            <img src={avatarURL} alt="" />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <input
              onChange={handleOnChange('fullname')}
              value={user.fullname}
              type="text" className="form-control" placeholder="Tên ..." required />
            <select
              onChange={handleOnChange('gender')}
              value={user.gender}
              className="form-control">
              <option value="">Giới tính</option>
              <option value='nam'>Nam</option>
              <option value='nu'>Nữ</option>
            </select>
            <input
              onChange={handleChangeFile}
              ref={inputFileEl}
              style={{display: 'none'}}
              type="file" name="avatar" placeholder="Ảnh đại diện" className="form-control" />  
            <textarea
              onChange={handleOnChange('description')}
              value={user.description}
              className="form-control" cols={30} rows={5} placeholder="Mô tả ngắn ..." defaultValue={""} />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}