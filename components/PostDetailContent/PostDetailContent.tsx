import { PostCommentForm } from "../PostCommentForm";
import { PostCommentList } from "../PostCommentList";
import { PostItem } from "../PostItem";

export default function PostDetailContent() {
  return (
    <div className="ass1-section__list">
      <PostItem />
      <PostCommentForm />
      <PostCommentList />
    </div>
  )
}