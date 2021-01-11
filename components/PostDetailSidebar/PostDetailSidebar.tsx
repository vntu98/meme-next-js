import { useGlobalState } from "../../state"

type PropsType = {
  category: string[],
  onChangeCategory: (a: string[]) => void
}

const PostDetailSidebar: React.FC<PropsType> = ({category, onChangeCategory}) => {
  const [listCategories] = useGlobalState('categories')
  const handleOnChange = (e) => {
    const isCheck = e.target.checked
    const value = e.target.value
    const findIdx = category.findIndex(cateId => cateId === value)
    const isExisting = findIdx !== -1
    if (!isExisting && isCheck) {
      onChangeCategory([...category, value])
    } else {
      onChangeCategory(category.filter(cateId => cateId !== value))
    }
  }

  return (
    <aside className="ass1-aside ass1-aside__edit-post">
        <div>
          <a href="#" className="ass1-btn">Đăng bài</a>
        </div>
        <div className="ass1-aside__edit-post-head">
          <span style={{display: 'block', width: '100%', marginBottom: '10px'}}>Chọn danh mục</span>
          {
            listCategories.map(cate => {
              return (
                <label className="ass1-checkbox" key={cate.id}>
                  <input 
                    type="checkbox" 
                    name="state-post" 
                    value={cate.id} 
                    onChange={handleOnChange}
                  />
                  <span />
                  <p>{cate.text}</p>
                </label>
              )
            })
          }
          
        </div>
        <div className="ass1-aside__get-code">
          <p>Share Link</p>
        </div>
        <div className="ass1-aside__social">
          <a href='/' className="ass1-btn-social__facebook ass1-btn-social"><i className="fa fa-facebook" aria-hidden="true" /></a>
          <a href='/' className="ass1-btn-social__twitter ass1-btn-social"><i className="fa fa-twitter" aria-hidden="true" /></a>
          <a href='/' className="ass1-btn-social__google ass1-btn-social"><i className="fa fa-google-plus" aria-hidden="true" /></a>
        </div>
      </aside>
  )
}

export default PostDetailSidebar