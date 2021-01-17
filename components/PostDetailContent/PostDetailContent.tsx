import Link from "next/link";
import { useState } from "react";
import { PostCommentForm } from "../PostCommentForm";
import { PostCommentList } from "../PostCommentList";
import { PostItem } from "../PostItem";
import postService from "../../services/postService"
import { useGlobalState } from "../../state"
import { useRouter } from "next/router"

export default function PostDetailContent({
  postDetailData, 
  postCategories,
  listComments: 
  initListComments
}) {
  const [listComments, setListComments] = useState(initListComments)
  const [token] = useGlobalState('token')
  const router = useRouter()
  const postid = router.query.postId

  const handleSubmitForm = (commentValue, callback) => {
    postService.postComment(postid, commentValue, token)
      .then(async (res) => {
        if (res.status === 200) {
          const listCommentsRes = await postService.getCommentsByPostId(postid)
          setListComments(listCommentsRes.comments)
          callback()
        } else {
          alert('Đăng bình luận không thành công !!!')
        }
      })
  }

  return (
    <div className="ass1-section__list">
      <PostItem post={postDetailData} />

      <div className="list-categories">
        <h5><strong>Danh mục: </strong></h5>
        <ul>
          {
            postCategories.map(obj => {
              return (
                <li key={obj.TAG_ID}>
                  <Link href={`/categories/${obj.tag_index}`}>
                    <a>{obj.tag_value}</a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      <PostCommentForm handleSubmitForm={handleSubmitForm}/>
      <PostCommentList listComments={listComments}/>
    </div>
  )
}