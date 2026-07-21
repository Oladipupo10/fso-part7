
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useAnecdotes } from '../hooks/useAnecdotes'
const CreateNew = () => {
  const { addNew } = useAnecdotes()
  const contentHook = useField('text')
  const authorHook = useField('text')
  const infoHook= useField('text')
  const { reset: resetContent, ...content} = contentHook
  const { reset: resetAuthor, ...author } = authorHook
  const { reset: resetInfo, ...info} = infoHook
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ 
       content: contentHook.value,
       author: authorHook.value,
       info: infoHook.value,
       votes: 0 
      })
    navigate('/')
  }
  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
