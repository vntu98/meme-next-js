import Masonry from 'react-masonry-component';
import { useGlobalState } from '../../state';
import { PostItem } from '../PostItem';

export default function UserDetailPost({ userDetailPost, userDetailInfo }) {
  const [currentUser] = useGlobalState('currentUser')
  const checkIsOwner = currentUser?.USERID === userDetailInfo.USERID

  return (
      <Masonry
        className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
      >
        {
          userDetailPost.map(post => <PostItem isOwner={checkIsOwner} post={post} customClass='col-lg-6' />)
        }
      </Masonry>
  )
}