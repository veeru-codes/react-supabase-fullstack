function NewFactForm(props) {
  const { categories, formData, handleFormData, handleSubmit, isUploading } =
    props

  return (
    <form className="form-fact" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        placeholder="Share a fact with the world..."
        value={formData.text}
        onChange={handleFormData}
        disabled={isUploading}
      />
      <span>{formData.text === '' ? 200 : 200 - formData.text.length}</span>
      <input
        type="text"
        name="source"
        placeholder="Trustworthy source..."
        value={formData.source}
        onChange={handleFormData}
        disabled={isUploading}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleFormData}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {categories.map((category, i) => (
          <option value={category.name} key={i}>
            {category.name[0].toUpperCase() + category.name.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  )
}

export default NewFactForm
