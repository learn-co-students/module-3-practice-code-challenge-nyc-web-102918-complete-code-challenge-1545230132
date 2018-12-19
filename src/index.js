document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1654 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const uLComments = document.querySelector('#comments')

  const likeButton =
  document.querySelector('#like_button')

  const likes =
  document.querySelector('#likes')

  const commnets = document.querySelector('#comment_input')

  const commentForm =
  document.querySelector('#comment_form')

fetch(`https://randopic.herokuapp.com/images/${imageId}`)
.then(r=>r.json())
.then(r=>{
  uLComments.innerHTML = `<li>${r.comments[0].content}</li>`
})

likeButton.addEventListener('click', (e)=>{
  let currentLikes = parseInt(likes.innerText)
  currentLikes += 1
  likes.innerText = currentLikes



  fetch('https://randopic.herokuapp.com/likes', {
        method: 'Post',
        headers: {'Content-type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
        image_id: 1654
        // like_count: currentLikes
          })

        })
        .then(r => r.json())
})

commentForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  let newComment = document.querySelector('#comment_input').value
  uLComments.innerHTML += `<li>${newComment}</li>
`

  fetch('https://randopic.herokuapp.com/comments', {
        method: 'Post',
        headers: {'Content-type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
        image_id: 1654,
        content: newComment
          })

        })
        .then(r => r.json())
})








})//end of dom content loaded
