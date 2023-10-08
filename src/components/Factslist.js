import Fact from './Fact'

function Factlist({ facts, categories, setFacts }) {
  if (facts.length === 0) {
    ;<p>No facts for this category yet! Create the first one ✌</p>
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact
            fact={fact}
            key={fact.id}
            categories={categories}
            setFacts={setFacts}
          />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  )
}

export default Factlist
