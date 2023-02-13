import { useState } from 'react'

// custom state hook

export default function useCustomState() {
  // initial state variable passed to useState
  const dummyState = [{ id: 1, text: '', user: '', children: [] }]
  // initialize state
  const [commentArr, setCommentArr] = useState(dummyState)

  // takes in a target id and array and searches the given array for the target id, if found it inserts a new comment object into the children array, if not, it recurs on the children array.
  function addComment(id, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        const newComment = {
          id: Math.floor(Math.random() * 1000),
          text: '',
          user: '',
          children: [],
        }
        array[i].children.push(newComment)
        return
      }

      if (array[i].children) {
        addComment(id, array[i].children)
      }
    }
  }

  // updates React state and uses addComment to create a new state variable

  function handleAddComment(id) {
    const updatedArray = [...commentArr]
    addComment(id, updatedArray)
    setCommentArr(updatedArray)
  }

  // searches an array for an object with the target id, if found it updates the text field of that object, if  not it recurs on the array of its children
  function updateComment(id, txt, array) {
    return array.map((comment) => {
      if (comment.id === id) {
        const { text, user } = txt
        return { ...comment, text: text, user: user }
      }

      if (comment.children) {
        const updatedChildren = updateComment(id, txt, comment.children)
        return { ...comment, children: updatedChildren }
      }

      return comment
    })
  }

  // updates React state and uses updateComment to create a new state variable
  function handleUpdateComment(id, text) {
    const newState = [...commentArr]
    setCommentArr(updateComment(id, text, newState))
  }

  // takes a target id and an array and searches the objects of given array for the target id, if found it removes the comment from the array. If not found  it recurs on any children arrays of each object
  function deleteComment(id, array) {
    return array
      .filter((comment) => comment.id !== id)
      .map((comment) => {
        if (comment.children) {
          const updatedChildren = deleteComment(id, comment.children)
          return { ...comment, children: updatedChildren }
        }

        return comment
      })
  }

  // updates React state and uses deleteComment to create a new state variable
  function handleDeleteComment(id) {
    const newState = [...commentArr]
    const updatedState = [...deleteComment(id, newState)]
    setCommentArr(updatedState)
  }

  return {
    commentArr,
    setCommentArr,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  }
}
