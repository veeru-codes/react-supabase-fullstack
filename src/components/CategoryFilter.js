import Category from './Category'

function CategoryFilter(props) {
  const { categories } = props

  return (
    <aside>
      <ul className="categories-list">
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {categories.map((category, i) => (
          <Category category={category} key={i} />
        ))}
      </ul>
    </aside>
  )
}

export default CategoryFilter
