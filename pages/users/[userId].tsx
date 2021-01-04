import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPost } from "../../components/UserDetailPost";

export default function UserDetail() {
  return (
    <div className="container">
      <UserDetailInfo />
      <UserDetailPost />
    </div>
  )
}