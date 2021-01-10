import Link from "next/link"
import { useGlobalState } from "../../state"

export default function HeaderMenu() {
  const [categories] = useGlobalState('categories')

  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <a href="#">Danh mục</a>
          <div className="ass1-header__nav" style={{display: 'none'}}>
            <div className="container">
              <ul>
                {
                  categories.map(category => {
                    return (
                      <li>
                        <Link href={`/categories/${encodeURIComponent(category.id)}`}>
                          <a>{category.text}</a>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
        <li className="active">
          <a href="index.html">Hot</a>
          <div className="ass1-header__nav" style={{display: 'none'}}>
            <div className="container">
              <ul>
                <li><a href="index.html">Funny</a></li>
                <li><a href="index.html">Animals</a></li>
                <li><a href="index.html">Anime &amp; Mâng</a></li>
                <li><a href="index.html">Awesome</a></li>
                <li><a href="index.html">Basketball</a></li>
              </ul>
              <ul>
                <li><a href="index.html">Car</a></li>
                <li><a href="index.html">Comic</a></li>
                <li><a href="index.html">Cosplay</a></li>
                <li><a href="index.html">Countryballs</a></li>
                <li><a href="index.html">Classical Art Memes</a></li>
              </ul>
              <ul>
                <li><a href="index.html">Girl</a></li>
                <li><a href="index.html">History</a></li>
                <li><a href="index.html">K-POP</a></li>
                <li><a href="index.html">V-POP</a></li>
                <li><a href="index.html">Pokémon</a></li>
              </ul>
              <ul>
                <li><a href="index.html">School</a></li>
                <li><a href="index.html">Star war</a></li>
                <li><a href="index.html">Coder</a></li>
                <li><a href="index.html">Travel</a></li>
                <li><a href="index.html">Sport</a></li>
              </ul>
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav>
  )
}