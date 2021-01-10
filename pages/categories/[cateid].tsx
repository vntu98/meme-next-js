import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import postService from "../../services/postService"
import Masonry from 'react-masonry-component';
import { PostItem } from "../../components/PostItem";
import { useGlobalState } from "../../state";

const SearchPage = ({ listPosts }) => {
  const router = useRouter()
  const categoryId = router.query.cateid || ''
  const [categories] = useGlobalState('categories')

  useEffect(() => {
    if (!categoryId) router.push('/')
  }, [categoryId])

  const findText = useMemo(() => {
    const findObj = categories.find(o => o.id === Number(categoryId))

    return findObj?.text || ''
  }, [categoryId, categories])

  return(
    <div className="container">
      <div className="header-search" style={{padding: '30px 0'}}>
        <h3>Danh mục tìm kiếm: <strong>{findText}</strong></h3>
        <h3>Tìm kiếm được: ({listPosts.length}) kết quả</h3>
      </div>
      <Masonry
        className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
      >
        {
          listPosts.map(post => <PostItem key={post.PID} post={post} customClass='col-lg-6' />)
        }
      </Masonry>
    </div>
  )
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const tagIndex = ctx.query.cateid as string

  const listPostsRes = await postService.getPostPagingByCategory({tagIndex})

  return { 
    listPosts: listPostsRes?.posts || []
  }
}

export default SearchPage