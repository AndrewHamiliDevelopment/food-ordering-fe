import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ products, addProduct, deleteProduct, editProduct }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSection, setSelectedSection] = useState('Personal Information');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
  };

  const handleGenderSelect = (gender, event) => {
    event.preventDefault();
    setSelectedGender(gender);
  };

  const handleProductImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const handleAddOrEditProduct = () => {
    if (productName && productPrice && productImage) {
      const newProduct = {
        id: editProductId || Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        category: 'Custom',
      };

      if (editProductId) {
        editProduct(newProduct);
      } else {
        addProduct(newProduct);
      }

      // Reset form fields
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setEditProductId(null);
      setIsModalOpen(false);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setEditProductId(product.id);
    setIsModalOpen(true);
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-info">
          <div className="profile-pic-container">
            <label htmlFor="file-upload" className="profile-pic" style={{ backgroundImage: `url(${profileImage || 'default-profile.png'})` }}>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            <div className="profile-actions">
              <FaEdit className="edit-icon" onClick={() => document.getElementById('file-upload').click()} />
              <FaTrash className="delete-icon" onClick={handleDeleteImage} />
            </div>
          </div>
          <h2>Kail Hamili</h2>
        </div>
        <nav>
          <ul>
            {['Personal Information', 'User Management', 'Product Management'].map((item) => (
              <li key={item} className={selectedSection === item ? 'active' : ''} onClick={() => handleSectionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      <main className="profile-form">
        <h2>{selectedSection}</h2>

        {selectedSection === 'Personal Information' && (
          <>
            <form>
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="Kail" />
                <label>Last Name</label>
                <input type="text" placeholder="Hamili" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Sir_Kail@company.com" />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" placeholder="+63" />
                <label>Date of Birth</label>
                <input type="date" />
              </div>
              <div className="gender-selection">
                <button className={selectedGender === 'Male' ? 'selected' : ''} onClick={(event) => handleGenderSelect('Male', event)}>Male</button>
                <button className={selectedGender === 'Female' ? 'selected' : ''} onClick={(event) => handleGenderSelect('Female', event)}>Female</button>
              </div>
              <div className="button-group">
                <button className="save">Save</button>
              </div>
            </form>
          </>
        )}

        {selectedSection === 'Product Management' && (

          <>
            <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>Add Product</button>
            <input
              type="text"
              placeholder="Search product...                        🔍"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
            />
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product) => (
                    <tr key={product.id}>
                      <td><img src={product.image} alt={product.name} className="product-img" /></td>
                      <td>{product.name}</td>
                      <td>₱{product.price}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </main>

      {isModalOpen && (
        <div className="modal">
          <h3>{editProductId ? 'Edit Product' : 'Add Product'}</h3>
          <input type="file" accept="image/*" onChange={handleProductImageUpload} />
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <button onClick={handleAddOrEditProduct}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
  export default Profile;