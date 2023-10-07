import Fact from './Fact'

function Factlist(props) {
  const facts = props.initialFacts

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id} categories={props.categories} />
        ))}
      </ul>
    </section>
  )
}

export default Factlist
