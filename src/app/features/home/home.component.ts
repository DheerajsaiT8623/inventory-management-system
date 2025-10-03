import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Sticky Navigation Bar -->
      <nav class="navbar" [class.scrolled]="isScrolled">
        <div class="nav-content">
          <div class="nav-logo">
            <i class="fas fa-cube"></i>
            <span>InventoryPro</span>
          </div>
          
          <div class="nav-menu">
            <div class="nav-item dropdown" (mouseenter)="openDropdown('products')" (mouseleave)="closeDropdown()">
              <a class="nav-link">
                Products <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown-menu" *ngIf="activeDropdown === 'products'">
                <a class="dropdown-item"><i class="fas fa-th"></i> By Category</a>
                <a class="dropdown-item"><i class="fas fa-star"></i> New Arrivals</a>
                <a class="dropdown-item"><i class="fas fa-fire"></i> Best Sellers</a>
                <a class="dropdown-item"><i class="fas fa-tags"></i> Special Offers</a>
              </div>
            </div>

            <div class="nav-item dropdown" (mouseenter)="openDropdown('solutions')" (mouseleave)="closeDropdown()">
              <a class="nav-link">
                Solutions <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown-menu" *ngIf="activeDropdown === 'solutions'">
                <a class="dropdown-item"><i class="fas fa-store"></i> For Small Business</a>
                <a class="dropdown-item"><i class="fas fa-building"></i> For Enterprises</a>
                <a class="dropdown-item"><i class="fas fa-plug"></i> Integrations</a>
                <a class="dropdown-item"><i class="fas fa-chart-pie"></i> Analytics Suite</a>
              </div>
            </div>

            <div class="nav-item dropdown" (mouseenter)="openDropdown('resources')" (mouseleave)="closeDropdown()">
              <a class="nav-link">
                Resources <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown-menu" *ngIf="activeDropdown === 'resources'">
                <a class="dropdown-item"><i class="fas fa-blog"></i> Blog</a>
                <a class="dropdown-item"><i class="fas fa-question-circle"></i> FAQs</a>
                <a class="dropdown-item"><i class="fas fa-headset"></i> Support Center</a>
                <a class="dropdown-item"><i class="fas fa-book"></i> Documentation</a>
              </div>
            </div>

            <div class="nav-item">
              <a class="nav-link" href="#pricing">Pricing</a>
            </div>
          </div>

          <div class="nav-actions">
            <a routerLink="/login" class="login-btn">
              <i class="fas fa-sign-in-alt"></i> Sign In
            </a>
          </div>

          <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
            <i class="fas" [class.fa-bars]="!mobileMenuOpen" [class.fa-times]="mobileMenuOpen"></i>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" [class.active]="mobileMenuOpen">
          <a class="mobile-menu-item" (click)="toggleMobileMenu()">Products</a>
          <a class="mobile-menu-item" (click)="toggleMobileMenu()">Solutions</a>
          <a class="mobile-menu-item" (click)="toggleMobileMenu()">Resources</a>
          <a class="mobile-menu-item" (click)="toggleMobileMenu()">Pricing</a>
          <a routerLink="/login" class="mobile-menu-item login" (click)="toggleMobileMenu()">
            <i class="fas fa-sign-in-alt"></i> Sign In
          </a>
        </div>
      </nav>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">✨ Smart Inventory Management</div>
          <h1 class="hero-title">
            Manage Your Inventory 
            <span class="gradient-text">Smarter & Faster</span>
          </h1>
          <p class="hero-subtitle">
            Streamline your business operations with our powerful yet simple inventory management system. 
            Track products, manage sales, and grow your business effortlessly.
          </p>
          <div class="hero-buttons">
            <a routerLink="/login" class="btn btn-primary">
              <i class="fas fa-rocket"></i> Get Started Free
            </a>
            <a routerLink="/login" class="btn btn-secondary">
              <i class="fas fa-sign-in-alt"></i> Sign In
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">1000+</div>
              <div class="stat-label">Products Managed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Happy Users</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title">Why Choose InventoryPro?</h2>
          <p class="section-subtitle">Everything you need to manage your inventory effectively</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon blue">
              <i class="fas fa-box-open"></i>
            </div>
            <h3>Easy Product Management</h3>
            <p>Add, edit, and track your products with an intuitive interface. Upload product images and manage stock levels in real-time.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon green">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Real-Time Analytics</h3>
            <p>Get instant insights into your sales, revenue, and inventory levels. Make data-driven decisions to grow your business.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon purple">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h3>Seamless Transactions</h3>
            <p>Buyers can browse products and make purchases effortlessly. Sellers get instant notifications and payment processing.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon orange">
              <i class="fas fa-users"></i>
            </div>
            <h3>Multi-Role Support</h3>
            <p>Separate dashboards for buyers and sellers. Each role gets customized features tailored to their needs.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon red">
              <i class="fas fa-rupee-sign"></i>
            </div>
            <h3>Indian Rupee Support</h3>
            <p>All transactions in ₹ (INR). Built specifically for Indian businesses with local payment methods.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon teal">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Responsive</h3>
            <p>Access your inventory from anywhere, on any device. Fully responsive design that works on phones, tablets, and desktops.</p>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">About InventoryPro</h2>
            <p>
              We are a team of passionate developers and business experts committed to simplifying 
              inventory management for small and medium-sized businesses across India.
            </p>
            <p>
              Our platform combines cutting-edge technology with user-friendly design to deliver 
              a solution that actually works for real businesses. Whether you're a seller managing 
              hundreds of products or a buyer looking for the best deals, we've got you covered.
            </p>
            <div class="about-features">
              <div class="about-feature">
                <i class="fas fa-check-circle"></i>
                <span>Secure & Reliable</span>
              </div>
              <div class="about-feature">
                <i class="fas fa-check-circle"></i>
                <span>Easy to Use</span>
              </div>
              <div class="about-feature">
                <i class="fas fa-check-circle"></i>
                <span>Fast Support</span>
              </div>
              <div class="about-feature">
                <i class="fas fa-check-circle"></i>
                <span>Regular Updates</span>
              </div>
            </div>
          </div>
          <div class="about-image">
            <div class="about-card">
              <i class="fas fa-warehouse"></i>
              <h3>10,000+</h3>
              <p>Transactions Processed</p>
            </div>
            <div class="about-card">
              <i class="fas fa-star"></i>
              <h3>4.9/5</h3>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works-section">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">Get started in 3 simple steps</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <h3>Create Account</h3>
            <p>Sign up in seconds as a buyer or seller. No credit card required.</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon">
              <i class="fas fa-boxes"></i>
            </div>
            <h3>Add Products</h3>
            <p>Sellers can add products with images, prices, and descriptions instantly.</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3>Start Trading</h3>
            <p>Begin buying or selling immediately. Track everything from your dashboard.</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="contact-content">
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">We'd love to hear from you. Reach out anytime!</p>
          <div class="contact-grid">
            <div class="contact-card">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <h3>Call Us</h3>
              <p><a href="tel:9940015078">9940015078</a></p>
              <span class="contact-note">Mon-Fri, 9 AM - 6 PM IST</span>
            </div>
            <div class="contact-card">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:abc@gmail.com">abc@gmail.com</a></p>
              <span class="contact-note">We reply within 24 hours</span>
            </div>
            <div class="contact-card">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <h3>Visit Us</h3>
              <p>Mumbai, Maharashtra<br>India - 400001</p>
              <span class="contact-note">By appointment only</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Transform Your Inventory Management?</h2>
          <p>Join hundreds of businesses already using InventoryPro</p>
          <a routerLink="/login" class="btn btn-large">
            <i class="fas fa-arrow-right"></i> Start Your Free Trial
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>InventoryPro</h3>
            <p>Making inventory management simple and efficient</p>
          </div>
          <div class="footer-links">
            <a routerLink="/login">Login</a>
            <a routerLink="/">Home</a>
            <a href="mailto:abc@gmail.com">Support</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 InventoryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .home-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
      padding-top: 80px;
    }

    /* Navigation Bar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 1);
    }

    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: #667eea;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .nav-logo:hover {
      transform: scale(1.05);
    }

    .nav-logo i {
      font-size: 1.8rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex: 1;
      justify-content: center;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      color: #2c3e50;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 8px;
    }

    .nav-link:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.08);
    }

    .nav-link i {
      font-size: 0.7rem;
      transition: transform 0.3s ease;
    }

    .nav-item:hover .nav-link i {
      transform: rotate(180deg);
    }

    .dropdown {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 252, 0.98));
      backdrop-filter: blur(10px);
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      padding: 0.75rem 0;
      min-width: 220px;
      margin-top: 0.5rem;
      animation: slideDown 0.3s ease;
      z-index: 100;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: #2c3e50;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent);
      color: #667eea;
      padding-left: 2rem;
    }

    .dropdown-item i {
      color: #667eea;
      font-size: 1rem;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .login-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }

    .login-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #2c3e50;
      cursor: pointer;
      padding: 0.5rem;
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 252, 0.98));
      backdrop-filter: blur(10px);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .mobile-menu.active {
      max-height: 500px;
      border-top: 1px solid #e9ecef;
    }

    .mobile-menu-item {
      padding: 1rem 2rem;
      color: #2c3e50;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid #f8f9fa;
      transition: all 0.2s ease;
    }

    .mobile-menu-item:hover {
      background: #f8f9fa;
      color: #667eea;
      padding-left: 2.5rem;
    }

    .mobile-menu-item.login {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8rem 2rem 6rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>') repeat;
      animation: float 20s linear infinite;
    }

    @keyframes float {
      from { transform: translateY(0); }
      to { transform: translateY(-100px); }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.5rem 1.5rem;
      border-radius: 50px;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
      animation: fadeInDown 0.6s ease;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      animation: fadeInUp 0.8s ease 0.2s backwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .gradient-text {
      background: linear-gradient(to right, #ffd89b, #19547b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2.5rem;
      opacity: 0.95;
      line-height: 1.8;
      animation: fadeInUp 0.8s ease 0.4s backwards;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      animation: fadeInUp 0.8s ease 0.6s backwards;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: white;
      color: #667eea;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      backdrop-filter: blur(10px);
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 4rem;
      flex-wrap: wrap;
      animation: fadeInUp 0.8s ease 0.8s backwards;
    }

    .stat-item {
      text-align: center;
      transition: transform 0.3s ease;
    }

    .stat-item:hover {
      transform: scale(1.1);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* Features Section */
    .features-section {
      padding: 5rem 2rem;
      background: #f8f9fa;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: #6c757d;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      text-align: center;
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }

    .feature-icon.blue { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .feature-icon.green { background: linear-gradient(135deg, #11998e, #38ef7d); color: white; }
    .feature-icon.purple { background: linear-gradient(135deg, #a8edea, #fed6e3); color: #764ba2; }
    .feature-icon.orange { background: linear-gradient(135deg, #fa709a, #fee140); color: white; }
    .feature-icon.red { background: linear-gradient(135deg, #f093fb, #f5576c); color: white; }
    .feature-icon.teal { background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; }

    .feature-card h3 {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #6c757d;
      line-height: 1.6;
    }

    /* About Section */
    .about-section {
      padding: 5rem 2rem;
      background: white;
    }

    .about-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-text h2 {
      margin-bottom: 1.5rem;
    }

    .about-text p {
      color: #6c757d;
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }

    .about-features {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 2rem;
    }

    .about-feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;
    }

    .about-feature i {
      color: #11998e;
      font-size: 1.2rem;
    }

    .about-image {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .about-card {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
    }

    .about-card i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .about-card h3 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .about-card p {
      opacity: 0.9;
    }

    /* How It Works Section */
    .how-it-works-section {
      padding: 5rem 2rem;
      background: #f8f9fa;
    }

    .steps-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .step-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 15px;
      text-align: center;
      flex: 1;
      min-width: 250px;
      max-width: 300px;
      position: relative;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }

    .step-number {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
    }

    .step-icon {
      width: 80px;
      height: 80px;
      margin: 1rem auto 1.5rem;
      background: #f8f9fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: #667eea;
    }

    .step-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .step-card p {
      color: #6c757d;
      line-height: 1.6;
    }

    .step-arrow {
      font-size: 2rem;
      color: #667eea;
      font-weight: 800;
    }

    /* Contact Section */
    .contact-section {
      padding: 5rem 2rem;
      background: white;
    }

    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .contact-card {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 2.5rem 2rem;
      border-radius: 15px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .contact-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }

    .contact-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .contact-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    .contact-card p {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .contact-card a {
      color: white;
      text-decoration: none;
      font-weight: 600;
    }

    .contact-note {
      display: block;
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 0.5rem;
    }

    /* CTA Section */
    .cta-section {
      padding: 5rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .btn-large {
      background: white;
      color: #667eea;
      padding: 1.2rem 3rem;
      font-size: 1.1rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .btn-large:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    }

    /* Footer */
    .footer {
      background: #2c3e50;
      color: white;
      padding: 3rem 2rem 1rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-brand h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .footer-brand p {
      opacity: 0.8;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: white;
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    }

    .footer-links a:hover {
      opacity: 1;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0.7;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .home-container {
        padding-top: 70px;
      }

      .nav-content {
        padding: 1rem;
      }

      .nav-menu {
        display: none;
      }

      .nav-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .mobile-menu {
        display: flex;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .about-content {
        grid-template-columns: 1fr;
      }

      .steps-grid {
        flex-direction: column;
      }

      .step-arrow {
        transform: rotate(90deg);
      }

      .footer-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {
  isScrolled = false;
  activeDropdown: string | null = null;
  mobileMenuOpen = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  openDropdown(menu: string) {
    this.activeDropdown = menu;
  }

  closeDropdown() {
    this.activeDropdown = null;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
