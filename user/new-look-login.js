document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginData = {
    username,
    email,
    password
  };

  try {
    const response = await fetch('https://us-central1-hire4change.cloudfunctions.net/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login Successful!');
      window.location.href = 'new-look-profile.html';  
    } else {
      document.getElementById('message').textContent = 'Login failed: ' + result.error;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    document.getElementById('message').textContent = 'An unexpected error occurred.';
  }
});
