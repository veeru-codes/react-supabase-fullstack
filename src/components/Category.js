function Category(props) {
  const { category, setCurrentCategory } = props
  return (
    <li className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: category.color }}
        onClick={() => setCurrentCategory(category.name)}
      >
        {category.name}
      </button>
    </li>
  )
}

export default Category
