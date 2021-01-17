import { useState } from "react"

export default function PostCommentForm({handleSubmitForm}) {
  const [commentValue, setCommentValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangeComment = (e) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    if (commentValue.trim().length !== 0) {
      setLoading(true)
      handleSubmitForm(commentValue, () => {
        setLoading(false)
      })
      // setCommentValue('')
    } else {
      alert('Vui lòng nhập nội dung bình luận !!!')
    }
  }

  return (
    <div className="ass1-add-comment">
      <form action="#" onSubmit={handleSubmit}>
        <input
          value={commentValue}
          onChange={handleChangeComment}
          type="text" className="form-control ttg-border-none" placeholder="Thêm một bình luận" />
      </form>
      <div className="ass1-add-comment__content">
        <a href="#" className="ass1-add-comment__btn-save ass1-btn-icon">
          <span>{180 - commentValue?.length }</span>
          <i className="icon-Submit_Tick" />
        </a>
      </div>
    </div>
  )
}