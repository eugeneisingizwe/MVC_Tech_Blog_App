const editFormHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('input[name="post-title"]').value.trim();
    const title = document.querySelector('input[name="content"]').value.trim();

    if (body && title) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ body, title}),
          headers: { 'Content-Type': 'application/json' },
        });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("failed to create a new post");
      }
    };

}

      
  document
  .querySelector('.btn')
  .addEventListener('submit', editFormHandler);