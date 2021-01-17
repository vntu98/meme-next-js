import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { highlightText } from '../../helpers'

dayjs.extend(relativeTime)
dayjs.locale('vi')

export default function PostItem({ post, customClass = '', isHighlight, query, isOwner }) {
  console.log(isOwner)
  const timeFormat = dayjs(post?.time_added).fromNow()
  let href = `/posts/${post?.PID}`
  let className = 'ass1-section__item'

  if (isOwner) {
    href += '/edit'
  }

  if (customClass) {
    className = className + " " + customClass
  }

  const renderFullName = () => {
    if (isHighlight && query) {
      return highlightText(post?.fullname, query)
    }

    return post?.fullname
  }

  const renderContent = () => {
    if (isHighlight && query) {
      return highlightText(post.post_content, query)
    }

    return post.post_content
  }

  if (!post) return null

  return (
    <div className={className}>
      <div className="ass1-section">
        <div className="ass1-section__head">
          <Link href={`/user/${post.USERID}`}>
            <a className="ass1-section__avatar ass1-avatar">
              <img src={post.profilepicture || '/images/avatar-02.png'} alt="" />
            </a>
          </Link>
          <div>
          <Link href={`/users/${post.USERID}`}>
            <a 
              className="ass1-section__name" 
              dangerouslySetInnerHTML={{ __html: renderFullName() }}
            />
          </Link>
            <span className="ass1-section__passed">{timeFormat}</span>
          </div>
        </div>
        <div className="ass1-section__content">
          <p 
            dangerouslySetInnerHTML={{__html: renderContent() }}
          />
          <div className="ass1-section__image">
          <Link href={href}>
            <a><img src={post.url_image} alt="" /></a>
          </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
        <Link href={href}>
          <a className="ass1-section__btn-comment ass1-btn-icon">
            <i className="icon-Comment_Full" /><span>{post.count || 0}</span>
          </a>
          </Link>
        </div>
      </div>
    </div>
  )
}