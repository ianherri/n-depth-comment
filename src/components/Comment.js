import { useState } from 'react'

export default function Comment({
  id,
  children,
  text,
  user,
  depth,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
}) {
  const [newText, setNewText] = useState(text)
  const [newUser, setNewUser] = useState(user)
  const [disabled, setDisabled] = useState(false)
  const [textError, setTextError] = useState('')

  // add one to depth each time
  depth++

  // click handler invokes handleAddComment global state hook
  function handleReply(event) {
    event.preventDefault()
    handleAddComment(id)
  }

  // click handler modifies local state and enables text editing
  function handleEdit(event) {
    event.preventDefault()
    const newDisabled = !disabled
    setDisabled(newDisabled)
  }

  // click handler invokes handleDeleteComment global state hook
  function handleDelete(event) {
    event.preventDefault()
    handleDeleteComment(id)
  }

  // click handler validates form input and invokes handleUpdateComment global state hook
  function handleSave(event) {
    event.preventDefault()
    setTextError('')
    // simple form validation - verify non-empty inputs
    if (newText.trim() === '' || newUser.trim() === '') {
      // set error state variable
      setTextError('You must complete both fields with non-empty text.')

      // remove error after 2seconds
      setTimeout(() => {
        setTextError('')
      }, 2000)
    } else {
      const saveValue = { text: newText, user: newUser }
      handleUpdateComment(id, saveValue)
      const newDisabled = true
      setDisabled(newDisabled)
      setTextError('')
    }
  }

  // key event handler executes on enter, invokes handleSave
  function handleEnter(event) {
    if (event.key === 'Enter') {
      handleSave(event)
    }
  }

  return (
    <li id={id}>
      <div
        onKeyUp={handleEnter}
        onSubmit={handleSave}
        className={depth > 1 ? `comment-container` : 'comment-container root'}
      >
        {disabled ? (
          <div
            onClick={disabled ? handleEdit : null}
            className='user-input user-saved'
          >
            {newUser}
          </div>
        ) : (
          <input
            className='user-input'
            disabled={disabled ? 'disabled' : ''}
            onChange={(event) => setNewUser(event.target.value)}
            value={newUser}
            placeholder={`Username${depth}`}
            type='text'
          ></input>
        )}
        {disabled ? (
          <div
            onClick={disabled ? handleEdit : null}
            className='text-input text-saved'
          >
            {newText}
          </div>
        ) : (
          <input
            className='text-input'
            disabled={disabled ? 'disabled' : ''}
            onChange={(event) => setNewText(event.target.value)}
            value={newText}
            placeholder='Some comment'
            type='text'
          ></input>
        )}
        {textError.length > 0 && <div className='error-text'>{textError}</div>}

        <div className='button-container'>
          <button onClick={handleReply}>Reply</button>
          {disabled && <button onClick={handleEdit}>Edit</button>}
          {!disabled && <button onClick={handleSave}>Save</button>}
          {depth > 1 ? (
            <button className='delete-btn' onClick={handleDelete}>
              Delete
            </button>
          ) : null}
        </div>
      </div>

      {children.length > 0 && (
        <ul className='render-list'>
          {children.map((item) => {
            return (
              <Comment
                depth={depth}
                key={item.id}
                {...item}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
                handleUpdateComment={handleUpdateComment}
              />
            )
          })}
        </ul>
      )}
    </li>
  )
}
