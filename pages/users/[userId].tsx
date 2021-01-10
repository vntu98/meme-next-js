import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPost } from "../../components/UserDetailPost";
import { getTokenSSRANDCSR } from "../../helpers";
import { useAuthen } from "../../helpers/useAuthen";
import postService from "../../services/postService";
import userService from "../../services/userService";

const UserDetail = ({ userDetailInfo, userDetailPost }) => {
  useAuthen()
  const router = useRouter()

  useEffect(() => {
    if (!userDetailInfo) {
      alert('User không tồn tại !!!')
      router.push('/')
    }
  }, [userDetailInfo])

  return (
    <div className="container">
      <UserDetailInfo userDetailInfo={userDetailInfo} postCount={userDetailPost.length}/>
      <UserDetailPost userDetailPost={userDetailPost}/>
    </div>
  )
}

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
  const userId = ctx.query.userId as string
  const cookieString = ctx?.req?.headers?.cookie
  const [token, userToken] = getTokenSSRANDCSR(cookieString)

  const userPos = userService.getUserById(userId)
  const postPos = postService.getPostByUserId({ token, userId })
  const [userRes, postRes] = await Promise.all([userPos, postPos])

  return {
    userDetailInfo: userRes?.user || null,
    userDetailPost: postRes?.posts || []
  }
}

export default UserDetail