const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();


    if (comment_text) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/post/comments', {
          method: 'POST',
          body: JSON.stringify({comment_text}),
          headers: { 'Content-Type': 'application/json' },
        });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("failed to create a new post");
      }
    };

        document.location.replace("./dashboard");
    
}

      
  document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);