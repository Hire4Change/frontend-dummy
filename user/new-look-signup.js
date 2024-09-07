document.getElementById('userForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const imageFile = document.getElementById('profilePicture').files[0];
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const userType = Array.from(document.getElementById('userType').selectedOptions).map(option => option.value);
  const location = document.getElementById('location').value;
  const bio = document.getElementById('bio').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const languages = document.getElementById('languages').value.split(',').map(lang => lang.trim());

  const education = [{
    institution: document.getElementById('institution').value,
    degree: document.getElementById('degree').value,
    fieldOfStudy: document.getElementById('fieldOfStudy').value,
    from: document.getElementById('educationFrom').value,
    to: document.getElementById('educationTo').value
  }];

  // Initialize workExperience, portfolioItems, and verificationDocuments as empty arrays
  const workExperience = [];
  const portfolioItems = [];
  const verificationDocuments = [];

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);  // Remove the "data:image/jpeg;base64," prefix
    reader.onerror = error => reject(error);
  });

  let base64Image = '';
  if (imageFile) {
    base64Image = await toBase64(imageFile);
  }

  let imageUrl = '';
  try {
    const imageResponse = await fetch('https://us-central1-hire4change.cloudfunctions.net/user/add-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ images: [{ image: base64Image }] })
    });

    const imageResult = await imageResponse.json();
    
    if (imageResponse.ok) {
      imageUrl = imageResult.urls[0];  // Assuming single image URL is returned
      alert('Image uploaded successfully! Image URL: ' + imageUrl);
    } else {
      alert('Image upload failed: ' + imageResult.error);
      return;  // Stop if image upload fails
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Image upload failed.');
    return;
  }

  const userData = {
    username,
    email,
    phoneNumber,
    passwordHash: password,  
    userType,
    location: { city: location },
    bio,
    skills,
    languages,
    education,
    workExperience,  // Initialize with an empty array
    portfolioItems,  // Initialize with an empty array
    profilePictureUrl: imageUrl,
    ratings: {
      asEmployer: null,
      asFreelancer: null
    },
    completedJobs: [],
    activeJobs: [],
    savedJobs: [],
    createdAt: new Date(),
    lastActive: new Date(),
    isVerified: false,  // False initially
    verificationDocuments,  // Initialize with an empty array
  };

  try {
    const response = await fetch('https://us-central1-hire4change.cloudfunctions.net/user/add-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('User registered successfully! ID: ' + result.id);
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    alert('An unexpected error occurred.');
  }
});

async function checkUsername() {
  const usernameInput = document.getElementById('username');
  const usernameStatus = document.getElementById('usernameStatus');
  const username = usernameInput.value;

  if (username.length < 8 || username.length > 16) {
    usernameStatus.textContent = 'Username must be between 8 and 16 characters.';
    usernameStatus.style.color = 'red';
    return;
  }

  try {
    const response = await fetch(`https://us-central1-hire4change.cloudfunctions.net/user/check-username?username=${encodeURIComponent(username)}`);
    
    // Check if the response content-type is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();

      if (response.ok) {
        if (result.exists) {
          usernameStatus.textContent = 'Username is already taken.';
          usernameStatus.style.color = 'red';
        } else {
          usernameStatus.textContent = 'Username is available.';
          usernameStatus.style.color = 'green';
        }
      } else {
        usernameStatus.textContent = 'Error checking username.';
        usernameStatus.style.color = 'red';
      }
    } else {
      // If the response is not JSON, log it and show an error
      const text = await response.text();
      console.error('Non-JSON response:', text);
      usernameStatus.textContent = 'Unexpected response format from server.';
      usernameStatus.style.color = 'red';
    }
  } catch (error) {
    usernameStatus.textContent = 'Unexpected error occurred.';
    usernameStatus.style.color = 'red';
    console.error('Error checking username:', error);
  }
}
