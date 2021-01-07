import { useState } from 'react'
import postService from '../../services/postService'
import { Button } from '../Button';
import { PostItem } from '../PostItem'

const pagesize = 3;

export default function PostListItem(props) {
  const [currPage, setcurrPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listPosts, setListPosts] = useState(props.listPosts)
  const handleLoadMore = () => {
    if (loading) return
    setLoading(true)
    postService.getPostPaging({ pagesize, currPage: currPage + 1 })
      .then(res => {
        if (res.status === 200) {
          const newPosts = res.posts || []
          setListPosts([
            ...listPosts,
            ...newPosts
          ])
          setcurrPage(prev => prev + 1)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="ass1-section__list">
      {
        listPosts.map(post => <PostItem post={post} />)
      }
      <Button 
        isLoading={loading} 
        onClick={handleLoadMore} 
        className="load-more ass1-btn"
      >
        <span>Xem thêm</span>
      </Button>
    </div>
  )
}