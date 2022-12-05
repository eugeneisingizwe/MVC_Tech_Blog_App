
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#password-signup').value.trim();
   
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
  .querySelector('.btn')
  .addEventListener('submit', signupFormHandler);
