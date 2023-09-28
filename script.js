const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
]

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

const btn = document.querySelector('.btn-open')
const factForm = document.querySelector('.form-fact')
const factsList = document.querySelector('.facts-list')
const categoriesList = document.querySelector('.categories-list')

// Create DOM elements: Render facts in list
factsList.innerHTML = ''

const categoriesListHTML = CATEGORIES.map(
  (category) => `
      <li class="category">
        <button class="btn btn-category" style="background-color: ${category.color}" >
          ${category.name}
        </button>
      </li>
    `
).join('')

categoriesList.insertAdjacentHTML('beforeend', categoriesListHTML)

// Generate facts HTML
function createFactsList(facts) {
  const htmlArr = facts
    .map((fact) => {
      const color = CATEGORIES.find(
        (category) => category.name === fact.category
      ).color
      return `
        <li class="fact">
          <p>
            ${fact.text}
            <a
              class="source"
              href="${fact.source}"
              target="_blank"
              >(Source)</a
            >
          </p>
          <span class="tag" style="background-color: ${color}">${fact.category}</span>
          <div class="vote-buttons">
            <button>👍 ${fact.votesInteresting}</button>
            <button>🤯 ${fact.votesMindblowing}</button>
            <button>⛔️ ${fact.votesFalse}</button>
          </div>
        </li>
      `
    })
    .join('')
  factsList.insertAdjacentHTML('afterbegin', htmlArr)
}

// Load data from Supabase
const getFacts = async () => {
  const res = await fetch(
    'https://ajqgsxepjvzuqdilghza.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcWdzeGVwanZ6dXFkaWxnaHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzI5MTMsImV4cCI6MjAxMTA0ODkxM30.vAR3CekgR5fpqs2oPNCH-W0JGNZtE55mSno464TDoOE',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcWdzeGVwanZ6dXFkaWxnaHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzI5MTMsImV4cCI6MjAxMTA0ODkxM30.vAR3CekgR5fpqs2oPNCH-W0JGNZtE55mSno464TDoOE',
      },
    }
  )

  const data = await res.json()

  createFactsList(data)
}

getFacts()

btn.addEventListener('click', function () {
  if (factForm.classList.contains('hidden')) {
    factForm.classList.remove('hidden')
    btn.textContent = 'Close'
  } else {
    factForm.classList.add('hidden')
    btn.textContent = 'Share a fact'
  }
})
