import Masonry from 'react-masonry-component';
import { PostItem } from '../PostItem';

export default function UserDetailPost({ userDetailPost }) {
  return (
      <Masonry
        className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
      >
        {
          userDetailPost.map(post => <PostItem post={post} customClass='col-lg-6' />)
        }
      </Masonry>
  )
}