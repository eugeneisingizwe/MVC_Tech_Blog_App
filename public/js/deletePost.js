const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split("/")[

        window.location.toString().split("./").leght -1 
    ];
   

const response = await fetch("./apit/posts/${id}", {

    // Send a POST request to the API endpoint
      method: 'DELETE',
      body: JSON.stringify({post_id: id}),
      headers: { 'Content-Type': 'application/json' },
    });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("failed to delete post");
      }
    };

      
  document
  .querySelector('.delete-post-btn')
  .addEventListener('submit', commentFormHandler);