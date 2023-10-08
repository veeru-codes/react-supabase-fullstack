import supabase from '../supabase'

function Fact(props) {
  const { fact, categories, setFacts } = props

  async function handleVote(columnName) {
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select()

    if (!error) {
      setFacts((prevFacts) => {
        return prevFacts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      })
    }
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find(
            (category) => category.name === fact.category
          ).color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote('votesInteresting')}>
          👍 {fact.votesInteresting}
        </button>
        <button onClick={() => handleVote('votesMindblowing')}>
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  )
}

export default Fact
