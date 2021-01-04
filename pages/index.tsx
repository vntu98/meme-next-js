import { PostListItem } from '../components/PostListItem'
import { HomeSideBar } from '../components/HomeSideBar'

export default function Home() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-8">
          <PostListItem />
        </div>
        <div className="col-lg-4">
          <HomeSideBar />
        </div>
      </div>
    </div>
  )
}
