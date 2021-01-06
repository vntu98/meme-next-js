import { PostItem } from '../PostItem'

export default function PostListItem({ listPosts }) {
  return (
    <div className="ass1-section__list">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <button className="load-more ass1-btn"><span>Xem thêm</span></button>
    </div>
  )
}