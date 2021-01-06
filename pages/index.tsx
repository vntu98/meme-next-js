import React from 'react'
import { PostListItem } from '../components/PostListItem'
import { HomeSideBar } from '../components/HomeSideBar'
import postService from '../services/postService'
import { getTokenSSRANDCSR } from '../helpers'

const Home = ({ listPosts, userPosts }) => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts} />
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

  const listPostsPos = postService.getPostPaging()
  const userPostsPos = postService.getPostByUserId({userId, token})
  const [listPostsRes, userPostsRes] = await Promise.all([listPostsPos, userPostsPos])

  const props = {
    listPosts: listPostsRes?.posts || [],
    userPosts: userPostsRes?.posts || []
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Home