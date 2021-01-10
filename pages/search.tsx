import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import postService from "../services/postService"
import Masonry from 'react-masonry-component';
import { PostItem } from "../components/PostItem";

const SearchPage = ({ listPosts }) => {
  const router = useRouter()
  const searchStr = router.query.q || ''

  useEffect(() => {
    if (!searchStr) router.push('/')
  }, [searchStr])

  return(
    <div className="container">
      <div className="header-search" style={{padding: '30px 0'}}>
        <h3>Từ khóa tìm kiếm: <strong>{searchStr}</strong></h3>
        <h3>Tìm kiếm được: ({listPosts.length}) kết quả</h3>
      </div>
      <Masonry
        className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
      >
        {
          listPosts.map(post => <PostItem post={post} customClass='col-lg-6' isHighlight={true} query={searchStr} />)
        }
      </Masonry>
    </div>
  )
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = ctx.query.q || ''
  const listPosts = await postService.getPostsSearch({query})

  return { 
    listPosts: listPosts?.posts || []
  }
}

export default SearchPage