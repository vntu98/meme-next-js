import { HomeSideBar } from "../../components/HomeSideBar";
import { PostDetailContent } from "../../components/PostDetailContent";

export default function PostDetail() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent />
        </div>
        <div className="col-lg-4">
          <HomeSideBar />
        </div>
      </div>
    </div>
  )
}