import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import Link from 'next/link'

dayjs.extend(relativeTime)
dayjs.locale('vi')

export default function PostCommentList({listComments}) {

  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">214 Bình luận</div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /></a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon"><i className="icon-Expand_all" /></a>
        </div>
      </div>
      {
        listComments.map(comment => {
          const timeFormat = dayjs(comment?.time_added).fromNow()
          return (
            <div key={comment.CID} className="ass1-comments__section">
              <Link href={`/users/${comment.USERID}`}>
                <a className="ass1-comments__avatar ass1-avatar"><img src={comment.profilepicture} alt="" /></a>
              </Link>
              <div className="ass1-comments__content">
                <Link href={`/users/${comment.USERID}`}>
                  <a className="ass1-comments__name">{comment.fullname}</a>
                </Link>
                <span className="ass1-comments__passed">{timeFormat}</span>
                <p>{comment.comment}</p>
                <div className="ass1-comments__info">
                  <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>901</span></a>
                  <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>36</span></a>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}