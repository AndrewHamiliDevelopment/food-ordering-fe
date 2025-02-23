import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import './Profile.css';
import {store} from '../store';

const Profile = () => {
  const [me, setMe] = React.useState(store.me)
    const [selectedGender, setSelectedGender] = useState("");
  const [selectedSection, setSelectedSection] = useState('Personal Information');
  const [profileImage, setProfileImage] = useState(null);
  const [addressDetails, setAddressDetails] = useState("");
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "52-C, Maningning Street",
      details: "52-C, Maningning Street, Teacher’s Village East, Teachers' Village West, Quezon City, Metro Manila, 1101, Philippines",
      position: [14.6488, 121.0509]
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState([14.6488, 121.0509]);
  const [editingAddressId, setEditingAddressId] = useState(null);

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

  const handleEditAddress = (id) => {
    const address = addresses.find(addr => addr.id === id);
    setEditingAddressId(id);
    setSelectedPosition(address.position);
    setAddressDetails(address.details);
    setIsModalOpen(true);
  };
  const handleGenderSelect = (gender, event) => {
   event.preventDefault();
   setSelectedGender(gender);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
          .then((response) => response.json())
          .then((data) => {
            setAddressDetails(data.display_name);
          })
          .catch((error) => console.error("Error fetching address:", error));
      },
    });

    return selectedPosition ? (
      <Marker
        position={selectedPosition}
        icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41] })}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const newLatLng = event.target.getLatLng();
            setSelectedPosition([newLatLng.lat, newLatLng.lng]);
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLatLng.lat}&lon=${newLatLng.lng}`)
              .then((response) => response.json())
              .then((data) => {
                setAddressDetails(data.display_name);
              })
              .catch((error) => console.error("Error fetching address:", error));
          },
        }}
      />
    ) : null;
  }

  const handleSaveAddress = () => {
    setAddresses(prevAddresses =>
      prevAddresses.map(addr =>
        addr.id === editingAddressId
          ? { ...addr, title: addressDetails.split(',')[0], details: addressDetails, position: selectedPosition }
          : addr
      )
    );
    setIsModalOpen(false);
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
          <h2>Jhon Doe</h2>
        </div>
        <nav>
          <ul>
            {['Personal Information', 'Addresses'].map((item) => (
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
            <p>Please fill out form if changes needed...</p>
            <form>
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder={me.userDetail !== null ? me.userDetail.firstName: '--not-set--'} />
                <label>Last Name</label>
                <input type="text" placeholder={me.userDetail !== null ? me.userDetail.firstName: '--not-set--'} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder={me.email} />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" placeholder="+63" />
                <label>Date of Birth</label>
                <input type="date" />
              </div>
              <div className="gender-selection">
            <button
            className={`male ${selectedGender === 'Male' ? 'selected' : ''}`}
                onClick={(event) => handleGenderSelect('Male', event)}
                      >
                   Male
               </button>
               <button
           className={`female ${selectedGender === 'Female' ? 'selected' : ''}`}
              onClick={(event) => handleGenderSelect('Female', event)}
                   >
                Female
                 </button>
                </div>
              <div className="button-group">
                <button className="save">Save</button>
              </div>
            </form>
          </>
        )}

        {selectedSection === 'Addresses' && (
          <>
            <div className="addresses-section">
              {addresses.map((address) => (
                <div key={address.id} className="address-card">
                  <div className="address-details">
                    <h3>{address.title}</h3>
                    <p>{address.details}</p>
                  </div>
                  <button className="edit-button" onClick={() => handleEditAddress(address.id)}>Edit</button>
                  <button className="save-address">Save Address</button>

                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
            <h2>Edit Address</h2>
            <p>Move/drag the map below if the pinned location is incorrect.</p>
            <div className="map-container">
              <MapContainer center={selectedPosition} zoom={15} className="leaflet-map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            <div className="input-group">
              <label>Address details (required)</label>
              <input type="text" value={addressDetails} onChange={(e) => setAddressDetails(e.target.value)} />
            </div>
            <button className="save" onClick={handleSaveAddress}>Save Address</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
