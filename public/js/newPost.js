const signupFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const Content= document.querySelector('#content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, Content}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    };

      
  document
  .querySelector('.btn')
  .addEventListener('submit', signupFormHandler);