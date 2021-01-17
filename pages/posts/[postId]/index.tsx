import { NextPage } from "next";
import { HomeSideBar } from "../../../components/HomeSideBar";
import { PostDetailContent } from "../../../components/PostDetailContent";
import { getTokenSSRANDCSR } from "../../../helpers";
import postService from "../../../services/postService";
import userService from "../../../services/userService";

const PostDetail = ({ postDetailData, postCategories, userPosts, comments }) => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent
            postDetailData={postDetailData}
            postCategories={postCategories}
            listComments={comments}
          />
        </div>
        <div className="col-lg-4">
          <HomeSideBar userPosts={userPosts}/>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const cookieString = context.req.headers.cookie
  const [token, userToken] = getTokenSSRANDCSR(cookieString)
  const userId = userToken?.id
  const postId = context.query.postId

  const postDetailPos = postService.getPostByPostId({ postId, token})
  const userPostsPos = postService.getPostByUserId({userId, token})
  const commentsPos = postService.getCommentsByPostId(postId)
  const [postDetailRes, userPostsRes, commentsRes] = await Promise.all([postDetailPos, userPostsPos, commentsPos])
  const postUserId = postDetailRes?.data?.post?.USERID || ''
  const userInfoData = await userService.getUserById(postUserId)

  let postDetailData = null
  if (postDetailRes?.data?.post) {
    postDetailData = {
      ...postDetailRes.data.post,
      fullname: userInfoData?.user?.fullname || '',
      profilepicture: userInfoData?.user?.profilepicture || ''
    }
  }

  const props = {
    postDetailData,
    postCategories: postDetailRes?.data?.categories || [],
    userPosts: userPostsRes?.posts || [],
    comments: commentsRes?.comments || []
  }
  return {
    props: props, // will be passed to the page component as props
  }
}

export default PostDetail