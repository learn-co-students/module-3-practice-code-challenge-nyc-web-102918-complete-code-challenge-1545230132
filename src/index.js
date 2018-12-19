function renderComment(comment) {
	return `<li id="li-${comment.id}">${comment.content}<br><button data-id="${comment.id}" data-action="delete">X</button></li>`
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let image_id = 1652 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${image_id}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const deleteURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector("#image_card")
	const comments = imageCard.querySelector("#comments")
  const commentForm = imageCard.querySelector("#comment_form")

  fetch(imageURL)
  	.then(r => r.json())
  	.then(r => {
  		const img = imageCard.querySelector("#image")
  		img.src = r.url
  		img.dataset.id = r.id

  		imageCard.querySelector("#name").textContent = r.name
  		imageCard.querySelector("#likes").textContent = r.like_count

  		comments.innerHTML = r.comments.map(renderComment).join("\n")
  	})

  imageCard.querySelector("#like_button").addEventListener('click', e => {
  	const likes = imageCard.querySelector("#likes")
  	const newCount = parseInt(likes.textContent) + 1

  	likes.textContent = newCount

  	fetch(likeURL, {
  		method: "POST",
  		headers: {
  			'Accept': 'application/json',
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			image_id
  		})
  	})
  })

  commentForm.addEventListener('submit', e => {
  	e.preventDefault()

  	fetch(commentsURL, {
  		method: "POST",
  		headers: {
  			'Accept': 'application/json',
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			image_id,
  			content: commentForm.querySelector("#comment_input").value
  		})
  	}).then(r => r.json()).then(r => {
  			comments.innerHTML += renderComment(r)
  	})

  	e.target.reset()
  })

  comments.addEventListener('click', e => {
  	if (e.target.dataset.action === "delete") {
  		fetch(deleteURL + e.target.dataset.id, {
  			method: "DELETE",
  			headers: {
  				'Accept': 'application/json',
	  			'Content-Type': 'application/json'
	  		},
	  		body: JSON.stringify({
	  			image_id
	  		})
	  	}).then(() => {
				comments.querySelector("#li-" + e.target.dataset.id).remove()
  		})
  	}
  })
})
