import React from 'react';
import './Home.css';
import Header from './Header';  

const Home = () => {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>FOS SYSTEM</h1>
          <p>Quick delivery, fresh food, anytime, anywhere!</p>
          <button className="cta-btn">Order Now</button>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="featured-dishes">
        <h2>Featured Dishes</h2>
        <div className="dish-grid">
          <div className="dish-card">
            <h3>Food 1</h3>
            <p>$price</p>
          </div>
          <div className="dish-card">
            <h3>Food 2</h3>
            <p>$price</p>
          </div>
          <div className="dish-card">
            <h3>Food 3</h3>
            <p>$price</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-list">
          <div className="category-item">Pizza</div>
          <div className="category-item">Burgers</div>
          <div className="category-item">Salads</div>
          <div className="category-item">Desserts</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <p>Pumili</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <p>Magbayad</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <p>Kumain</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Food Ordering System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
