import api from './api'

const userService = {
  getUserById: (userId: string) => {
    return api.callJson(`/member/member.php?userid=${userId}`)
  }
}

export default userService