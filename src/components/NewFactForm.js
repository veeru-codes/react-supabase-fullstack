function NewFactForm() {
  return (
    <form className="form-fact">
      <input type="text" placeholder="Share a fact with the world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select>
        <option value="">Choose category:</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
        <option value="society">Society</option>
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  )
}

export default NewFactForm
