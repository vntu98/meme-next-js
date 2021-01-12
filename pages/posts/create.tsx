import { useEffect, useState } from "react";
import { PostDetailForm } from "../../components/PostDetailForm";
import { PostDetailSidebar } from "../../components/PostDetailSidebar";
import { useAuthen } from "../../helpers/useAuthen";
import postService from "../../services/postService";
import { useGlobalState } from "../../state";

const initState = {
  url_image: '',
  post_content: '',
  category: [],
  obj_image: {
    file: null,
    base64: ''
  }
}

export default function PostCreate() {
  useAuthen()
  const [postData, setPostData] = useState(initState)
  const [loading, setLoading] = useState(false)
  const [token] = useGlobalState('token')
  
  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({
      ...postData,
      [key]: value
    })
  }

  const handleSubmitPost = () => {
    setLoading(true)
    postService.createNewPost(postData, token)
      .then(res => {
        if (res.status === 200) {
          setPostData(initState)
          alert('Đăng bài viết thành công !!!')
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