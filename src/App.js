import React from 'react'
import supabase from './supabase'
import './styles.css'
import Header from './components/Header'
import NewFactForm from './components/NewFactForm'
import CategoryFilter from './components/CategoryFilter'
import Factlist from './components/Factslist'
import Loader from './components/Loader'

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
]

function App() {
  const [showForm, setShowForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    text: '',
    source: '',
    category: '',
  })
  const [facts, setFacts] = React.useState([])
  const [currentCategory, setCurrentCategory] = React.useState('all')
  const [isUploading, setIsUploading] = React.useState(false)

  React.useEffect(() => {
    async function getFacts() {
      setIsLoading(true)

      let query = supabase.from('facts').select('*')

      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory)
      }

      const { data: facts, error } = await query
        .order('votesInteresting', { ascending: false })
        .limit(1000)

      if (!error) setFacts(facts)

      setIsLoading(false)
    }

    getFacts()
  }, [currentCategory])

  function isValidHttpUrl(string) {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  const toggleVisibility = () => setShowForm((prevShowForm) => !prevShowForm)

  const handleFormData = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    //  1. Prevent browser reloaa
    event.preventDefault()

    // 2. Check if data is valid. If so, create a new fact
    if (
      formData.text &&
      isValidHttpUrl(formData.source) &&
      formData.category &&
      formData.text.length <= 200
    ) {
      setIsUploading(true)

      // 3. Upload fact to Supabase and receive the new fact object
      const { data, error } = await supabase
        .from('facts')
        .insert([
          {
            text: formData.text,
            source: formData.source,
            category: formData.category,
          },
        ])
        .select()

      setIsUploading(false)

      if (!error) {
        const newFact = data[0]

        // 4. Add the new fact to the UI: add the fact to state
        setFacts((prevFacts) => [newFact, ...prevFacts])
      }
      // 5. Reset input fields
      setFormData({ text: '', source: '', category: '' })

      // 6. Close the form
      setShowForm(false)
    }
  }

  return (
    <>
      <Header toggleVisibility={toggleVisibility} showForm={showForm} />
      {showForm ? (
        <NewFactForm
          categories={CATEGORIES}
          formData={formData}
          handleFormData={handleFormData}
          handleSubmit={handleSubmit}
          isUploading={isUploading}
        />
      ) : (
        ''
      )}
      <main className="main">
        <CategoryFilter
          categories={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Factlist facts={facts} categories={CATEGORIES} setFacts={setFacts} />
        )}
      </main>
    </>
  )
}

export default App
