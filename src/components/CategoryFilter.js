import Category from './Category'

function CategoryFilter(props) {
  const { categories, setCurrentCategory } = props

  return (
    <aside>
      <ul className="categories-list">
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory('all')}
          >
            All
          </button>
        </li>
        {categories.map((category, i) => (
          <Category
            category={category}
            key={i}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </ul>
    </aside>
  )
}

export default CategoryFilter
