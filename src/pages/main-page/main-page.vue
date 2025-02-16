<template>
  <div class="main-container">
    <Header />
    <main class="content">
      <div class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Welcome to 3DHUB</h1>
            <p class="subtitle">Your Gateway to 3D Content</p>
            <p class="description">Create. Share. Discover.</p>
          </div>
          
          <div class="hero-stats">
            <div class="stat">
              <span class="number">10K+</span>
              <span class="label">Models</span>
            </div>
            <div class="stat">
              <span class="number">5K+</span>
              <span class="label">Artists</span>
            </div>
            <div class="stat">
              <span class="number">100K+</span>
              <span class="label">Downloads</span>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/catalog-page" class="btn primary">Explore</router-link>
            <button class="btn secondary" @click="handleUpload">Create</button>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z"/>
            </svg>
          </div>
          <h3>High Quality Models</h3>
          <p>Access thousands of professionally created 3D models</p>
        </div>
        
        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h3>Global Community</h3>
          <p>Join creators from around the world</p>
        </div>

        <div class="feature">
          <div class="icon">
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 2v11h3v9l7-12h-4l4-8z"/>
            </svg>
          </div>
          <h3>Fast Downloads</h3>
          <p>Instant access to all your favorite models</p>
        </div>
      </div>

      <div class="featured-models">
        <h2>Featured Models</h2>
        <p class="section-description">Discover our handpicked selection of stunning 3D models</p>
        
        <div class="model-slider">
          <div class="model-card">
            <img src="https://i.pinimg.com/736x/08/3a/f2/083af260561a470b24f0ed4692f83681.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Sci-Fi Character</h4>
              <p>By John Doe</p>
              <div class="model-stats">
                <span>4.9 ★</span>
                <span>2.3k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/60/82/b3/6082b3d715e1a8520f8f0e78d8d164c9.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Fantasy Warrior</h4>
              <p>By Jane Smith</p>
              <div class="model-stats">
                <span>4.8 ★</span>
                <span>1.8k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/13/fa/34/13fa34951175febd7035ea9da8d17011.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Mech Design</h4>
              <p>By Mike Johnson</p>
              <div class="model-stats">
                <span>5.0 ★</span>
                <span>3.1k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/f7/08/a0/f708a05a6e9571012247432091c54798.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Cyberpunk Vehicle</h4>
              <p>By Sarah Wilson</p>
              <div class="model-stats">
                <span>4.7 ★</span>
                <span>2.5k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/4d/35/a5/4d35a54f521195bfa04464c2c9e32a7c.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Robot Concept</h4>
              <p>By Alex Brown</p>
              <div class="model-stats">
                <span>4.9 ★</span>
                <span>1.9k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/74/a5/0a/74a50a94771a9ad7ef6173b691936bcf.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Space Explorer</h4>
              <p>By Emma Davis</p>
              <div class="model-stats">
                <span>4.9 ★</span>
                <span>2.7k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/e8/d7/1a/e8d71ab98103207e825300917f6916fd.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Ancient Guardian</h4>
              <p>By Tom Clark</p>
              <div class="model-stats">
                <span>4.8 ★</span>
                <span>2.1k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/25/8f/b4/258fb405c5166291115b427727ec398d.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Future Soldier</h4>
              <p>By Chris White</p>
              <div class="model-stats">
                <span>5.0 ★</span>
                <span>3.4k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/7e/f7/cc/7ef7cc2291fd40192005847e96517b43.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Battle Mech</h4>
              <p>By Lisa Green</p>
              <div class="model-stats">
                <span>4.9 ★</span>
                <span>2.8k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/00/19/2a/00192a35b829d6b5952fb8b57f7c45e8.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Desert Wanderer</h4>
              <p>By Mark Taylor</p>
              <div class="model-stats">
                <span>4.7 ★</span>
                <span>1.9k Downloads</span>
              </div>
            </div>
          </div>

          <div class="model-card">
            <img src="https://i.pinimg.com/736x/8b/27/f4/8b27f41e82c1a4360f75cda0290d62d7.jpg" alt="3D Model">
            <div class="model-info">
              <h4>Tech Samurai</h4>
              <p>By Ryan Lee</p>
              <div class="model-stats">
                <span>4.8 ★</span>
                <span>2.2k Downloads</span>
              </div>
            </div>
          </div>
        </div>

        <div class="slider-controls">
          <button class="control-btn prev">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button class="control-btn next">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Enterprise</h3>
          <ul>
            <li><a href="#">Enterprise Solutions</a></li>
            <li><a href="#">3D Configurators</a></li>
            <li><a href="#">3D eCommerce</a></li>
            <li><a href="#">3D Viewer</a></li>
            <li><a href="#">3D Advertising</a></li>
            <li><a href="#">3DHUB for Teams</a></li>
            <li><a href="#">Customer Stories</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Ecosystem</h3>
          <ul>
            <li><a href="#">Exporters</a></li>
            <li><a href="#">Importers</a></li>
            <li><a href="#">Developers & API</a></li>
            <li><a href="#">Augmented Reality</a></li>
            <li><a href="#">Virtual Reality</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Store</h3>
          <ul>
            <li><a href="#">Buy 3D models</a></li>
            <li><a href="#">Best Selling</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Become a Seller on Fab</a></li>
            <li><a href="#">Free 3D Models</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Education</a></li>
            <li><a href="#">Museums</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">3DHUB Masters</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="#">Company</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          © 2025, 3DHUB, Inc. All rights reserved.
        </div>
        <div class="legal-links">
          <a href="#">Terms of use</a>
          <a href="#">Refund policy</a>
          <a href="#">Privacy policy</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>

    <login-modal v-if="showLoginModal" @close="showLoginModal = false" />
    <signup-modal v-if="showSignupModal" @close="showSignupModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '../../components/header/header.vue';
import LoginModal from '../../components/login-window/login.vue';
import SignupModal from '../../components/signup-window/signup.vue';

const showLoginModal = ref(false);
const showSignupModal = ref(false);

onMounted(() => {
  const slider = document.querySelector('.model-slider');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -380, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }
});
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #0a0a0a;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.content {
  padding: 80px 5%;
  background: #111111;
  margin-bottom: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  position: relative;
}

.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://cdna.artstation.com/p/assets/images/images/075/847/876/large/roksolana-khrouchtch-gap-f-khrouchtch-roksolana-01.jpg?1715857261');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0;
}

.hero {
  text-align: left;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  width: 50%;
  padding-left: 5%;
}

.hero-text {
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 56px;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.subtitle {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.description {
  color: #999;
  font-size: 18px;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: left;
}

.stat .number {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #4CAF50;
}

.stat .label {
  color: #999;
  font-size: 14px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn.primary {
  background: #4CAF50;
  color: #fff;
  border: none;
}

.btn.primary:hover {
  transform: translateY(-2px);
  background: #66BB6A;
}

.btn.secondary {
  background: transparent;
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

.btn.secondary:hover {
  background: #4CAF50;
  color: #fff;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 80px;
  position: relative;
  z-index: 1;
}

.feature {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s;
  border: 1px solid #333;
}

.feature:hover {
  transform: translateY(-10px);
}

.feature .icon {
  color: #4CAF50;
  margin-bottom: 20px;
}

.feature h3 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.feature p {
  color: #999;
  line-height: 1.6;
}

.featured-models {
  margin-top: 100px;
  position: relative;
  z-index: 1;
}

.featured-models h2 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 700;
}

.section-description {
  text-align: center;
  color: #999;
  margin-bottom: 3rem;
  font-size: 18px;
}

.model-slider {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.model-slider::-webkit-scrollbar {
  display: none;
}

.model-card {
  flex: 0 0 360px;
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  scroll-snap-align: start;
  transition: transform 0.3s;
  border: 1px solid #333;
}

.model-card:hover {
  transform: translateY(-10px);
}

.model-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.model-info {
  padding: 25px;
}

.model-info h4 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 8px;
}

.model-info p {
  color: #4CAF50;
  font-size: 16px;
  margin-bottom: 12px;
}

.model-stats {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 15px;
}

.slider-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.control-btn {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #4CAF50;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #4CAF50;
  color: #fff;
  transform: scale(1.1);
}

.footer {
  background: #0a0a0a;
  padding: 60px 5% 30px;
  border-top: 1px solid #333;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  color: #fff;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section ul li a {
  color: #999;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #4CAF50;
}

.footer-bottom {
  padding-top: 30px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: #999;
  font-size: 14px;
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  color: #999;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.legal-links a:hover {
  color: #4CAF50;
}

@media (max-width: 1200px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
