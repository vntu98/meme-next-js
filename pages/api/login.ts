import api from "../../services/api"

export default async (req, res) => {
  const method = req.method
  const data = req.body
  const currentTime = new Date()
  const nextYear = new Date(currentTime.getFullYear() + 1, currentTime.getMonth())
  const resHeroku = await api.callJson('/member/login.php', { data, method })
  
  if (resHeroku.status === 200) {
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('X-Token', 'X-Token')
    res.setHeader('Set-Cookie', `token=${resHeroku.token}; expires=${nextYear.toUTCString()}; Path=/`)
    res.json(resHeroku)
  } else {
    res.statusCode = 302
    res.setHeader('Location', '/login?error=dang-nhap-khong-thanh-cong')
    res.json(resHeroku)
  }
}
