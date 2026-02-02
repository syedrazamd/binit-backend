document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();

  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const formData = new FormData();
      formData.append('issueType', document.getElementById('issueType').value);
      formData.append('description', document.getElementById('description').value);
      formData.append('image', document.getElementById('image').files[0]);
      formData.append('latitude', pos.coords.latitude);
      formData.append('longitude', pos.coords.longitude);

      const response = await fetch('https://binit-backend-97m8.onrender.com/api/complaints', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      alert(result.message || 'Complaint Submitted');
      window.location.href = 'status.html';
    } catch (err) {
      console.error('Error submitting complaint:', err);
      alert('Failed to submit complaint. Please try again.');
    }
  }, error => {
    alert('Failed to get your location. Please allow location access.');
    console.error(error);
  });
});
