document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1662 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let randoPic

  const image = document.querySelector("#image")
  const name = document.querySelector("#name")
  const likes = document.querySelector("#likes")
  const comments = document.querySelector("#comments")

  fetch(imageURL)
  .then( result => result.json() )
  .then( parsedResult => {
    randoPic = parsedResult

    image.src = `${randoPic.url}`
    name.innerHTML = `${randoPic.name}`
    likes.innerHTML = `${randoPic.like_count}`

    randoPic.comments.forEach( comment => {
      comments.innerHTML += `
        <li id="comment-${comment.id}">
          ${comment.content}
          <button data-id="${comment.id}" id="delete_comment"> X </button>
        </li>
      `
    })
  })

  document.body.addEventListener("click", event => {
    if (event.target.id === "like_button") {
      likes.innerHTML = `${++randoPic.like_count}`

      fetch("https://randopic.herokuapp.com/likes", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: `${imageId}`
          })
      })
    }
    else if (event.target.id === "delete_comment") {
      const commentId = event.target.dataset.id
      const commentElement = document.querySelector(`#comment-${commentId}`)
      const commentObject = randoPic.comments.find( comment => comment.id == commentId )

      commentElement.remove()

      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: "DELETE"
      })
    }
  })

  document.body.addEventListener("submit", event => {
    event.preventDefault()
    const commentInputValue = document.querySelector("#comment_input").value

    fetch("https://randopic.herokuapp.com/comments", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: `${commentInputValue}`
      })
    })
    .then( result => result.json() )
    .then( parsedResult => {
      comments.innerHTML += `
        <li id="comment-${parsedResult.id}">
          ${parsedResult.content}
          <button data-id="${parsedResult.id}" id="delete_comment"> X </button>
        </li>
      `
      document.querySelector("#comment_form").reset()
    })
  })

})
