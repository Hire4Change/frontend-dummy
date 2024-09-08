import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    fromDateTime: '',
    toDateTime: '',
    publisher: 'HarshAditya',
    type: 'on-site',
    address: '',
    street: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    keywords: '',
    description: '',
    amount: '',
    currency: '₹',
    rateType: 'hourly',
    category: '',
    otherCategory: '',
    skillsRequired: '',
    experienceLevel: 'beginner',
    images: [],
  });
  
  const [imagePreviews, setImagePreviews] = useState([]);
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, type: value });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, category: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Preview images
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };

    dataToSubmit.keywords = formData.keywords.split(',').map(k => k.trim());
    dataToSubmit.skillsRequired = formData.skillsRequired.split(',').map(s => s.trim());
    
    if (formData.type !== 'remote') {
      dataToSubmit.location = {
        address: formData.address,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        coordinates: {
          type: "Point",
          coordinates: [0, 0] // You can add actual coordinates
        }
      };
    }

    // Category handling
    if (formData.category === 'other') {
      dataToSubmit.category = formData.otherCategory;
    }

    // Simulating the API call
    try {
      const res = await fetch('https://us-central1-hire4change.cloudfunctions.net/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await res.json();
      setResponse({ message: 'Job listing created successfully!', type: 'success' });
    } catch (error) {
      setResponse({ message: 'Failed to create job listing.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h1>Create Job Listing</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="fromDateTime">From Date and Time:</label>
        <input
          type="datetime-local"
          id="fromDateTime"
          name="fromDateTime"
          value={formData.fromDateTime}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="toDateTime">To Date and Time:</label>
        <input
          type="datetime-local"
          id="toDateTime"
          name="toDateTime"
          value={formData.toDateTime}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleTypeChange}
          required
        >
          <option value="on-site">On-site</option>
          <option value="remote">Remote</option>
          <option value="flexible">Flexible</option>
        </select>

        {formData.type !== 'remote' && (
          <>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />

            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />

            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />

            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </>
        )}

        <label htmlFor="keywords">Keywords (comma-separated):</label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="amount">Price Quote Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
        >
          <option value="₹">INR (₹)</option>
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
        </select>

        <label htmlFor="rateType">Rate Type:</label>
        <select
          id="rateType"
          name="rateType"
          value={formData.rateType}
          onChange={handleInputChange}
          required
        >
          <option value="hourly">Hourly</option>
          <option value="fixed">Fixed</option>
          <option value="daily">Daily</option>
        </select>

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Domestic Services">Domestic Services</option>
          <option value="other">Other</option>
        </select>

        {formData.category === 'other' && (
          <input
            type="text"
            id="otherCategory"
            name="otherCategory"
            placeholder="Specify other category"
            value={formData.otherCategory}
            onChange={handleInputChange}
            required
          />
        )}

        <label htmlFor="skillsRequired">Skills Required (comma-separated):</label>
        <input
          type="text"
          id="skillsRequired"
          name="skillsRequired"
          value={formData.skillsRequired}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="experienceLevel">Experience Level:</label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleInputChange}
          required
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>

        <div className="image-upload">
          <label htmlFor="images">Upload Images:</label>
          <input type="file" id="images" name="images" accept="image/*" multiple onChange={handleImageChange} />
          <div id="imageContainer">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" width="100" height="100" />
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className={response.type === 'success' ? 'success' : 'error'}>
          {response.message}
        </div>
      )}
    </div>
  );
}

export default JobListingForm;
