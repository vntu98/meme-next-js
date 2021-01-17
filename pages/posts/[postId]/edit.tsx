import { useEffect, useState } from "react";
import { PostDetailForm } from "../../../components/PostDetailForm";
import { PostDetailSidebar } from "../../../components/PostDetailSidebar";
import { getTokenSSRANDCSR } from "../../../helpers";
import { useAuthen } from "../../../helpers/useAuthen";
import postService from "../../../services/postService";
import { useGlobalState } from "../../../state";

const initState = {
  url_image: '',
  post_content: '',
  category: [],
  obj_image: {
    file: null,
    base64: ''
  }
}

const PostEdit = ({postDetailData, postCategories, postid}) => {
  useAuthen()
  const [postData, setPostData] = useState(() => {
    return {
      postid,
      url_image: postDetailData.url_image,
      post_content: postDetailData.post_content,
      category: postCategories.map(category => category.tag_index),
      obj_image: {
        file: null,
        base64: ''
      }
    }

  })
  const [loading, setLoading] = useState(false)
  const [token] = useGlobalState('token')
  
  const onChangeDetailForm = (key: string, value: any) => {
    if (key === 'obj_image') {
      setPostData({
        ...postData,
        [key]: value,
        url_image: ''
      })
      
      return
    }
    setPostData({
      ...postData,
      [key]: value
    })
  }

  const handleSubmitPost = () => {
    setLoading(true)
    postService.editPost(postData, token)
      .then(res => {
        if (res.status === 200) {
          alert('Cập nhật bài viết thành công !!!')
          setPostData({
            ...postData,
            url_image: res?.data?.post?.url_image,
            obj_image: {
              file: null,
              base64: ''
            }
          })
        } else {
          alert('Đăng bài viết thất bại !!!')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm 
            url_image={postData.url_image}
            post_content={postData.post_content}
            obj_image={postData.obj_image}
            onChangeDetailForm={onChangeDetailForm}
          />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar
            loading={loading}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
            handleSubmitPost={handleSubmitPost}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const cookieString = context.req.headers.cookie
  const [token] = getTokenSSRANDCSR(cookieString)
  const postId = context.query.postId

  const postDetailPos = postService.getPostByPostId({ postId, token})
  const [postDetailRes] = await Promise.all([postDetailPos])

  const props = {
    postid: postId,
    postDetailData: postDetailRes?.data?.post,
    postCategories: postDetailRes?.data?.categories || []
  }
  return {
    props: props, // will be passed to the page component as props
  }
}

export default PostEdit