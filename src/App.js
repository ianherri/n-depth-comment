import './App.css'
import useCustomState from './providers/state.js'
import Comment from './components/Comment.js'

export default function App() {
  const {
    commentArr,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  } = useCustomState()
  // variable used to determine how deeply nested a given comment is
  let depth = 0

  return (
    <main>
      <div className='render-list-container'>
        <ul className='render-list'>
          {commentArr.map((comment) => {
            return (
              <Comment
                depth={depth}
                key={comment.id}
                {...comment}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
                handleUpdateComment={handleUpdateComment}
              />
            )
          })}
        </ul>
      </div>
    </main>
  )
}
