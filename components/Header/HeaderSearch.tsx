import { useRouter } from "next/router"
import { useState } from "react"

export default function HeaderSearch() {
  const [queryStr, setQueryStr] = useState('')
  const router = useRouter()

  const onChange = (e) => {
    setQueryStr(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (queryStr) {
      router.push(`/search?q=${queryStr}`)
    }
  }
  return (
    <div className="ass1-header__search">
      <form action="#" onSubmit={handleSubmit}>
        <label>
          <input onChange={onChange} type="search" name="search-text" className="form-control" placeholder="Nhập từ khóa ..." />
          <i className="icon-Search" />
        </label>
      </form>
    </div>
  )
}