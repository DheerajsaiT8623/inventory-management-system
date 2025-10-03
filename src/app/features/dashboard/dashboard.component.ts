
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User, Product } from '../../core/models/models';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './dashboard.component.html',
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .dashboard-container h1 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .logout-btn {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      margin-left: auto;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
      transition: all 0.3s ease;
    }
    .logout-btn:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }
    .business-overview {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 10px;
      margin-bottom: 2rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 8px;
    }
    .seller-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .form-section, .products-section {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 252, 0.95));
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }
    .form-section h2, .products-section h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    .product-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    .form-group input, .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #3498db;
    }
    .add-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      align-self: flex-start;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      transition: all 0.3s ease;
    }
    .add-btn:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .product-card {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 252, 0.98));
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 1.5rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.9);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }
    .product-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .product-card h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    .product-card p {
      color: #7f8c8d;
      margin-bottom: 0.5rem;
    }
    .product-price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #27ae60;
      margin-bottom: 1rem;
    }
    .buy-btn {
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
      transition: all 0.3s ease;
      width: 100%;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }
    .buy-btn:hover {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(96, 165, 250, 0.4);
    }
    @media (max-width: 768px) {
      .seller-content {
        grid-template-columns: 1fr;
      }
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSub?: Subscription;
  products$: Observable<Product[]>;
  sellerProducts: any[] = [];
  productForm!: FormGroup;
  buyForms: { [productId: number]: FormGroup } = {};
  buyMessage = '';
  isLoading = false;
  buyError = false;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  ready = false;

  private productsSub?: Subscription;

  private initializeProducts() {
    if (this.currentUser?.role === 'seller') {
      // Initialize seller products
      this.sellerProducts = this.userService.getSellerProductStats(this.currentUser.id);
    }
  }

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
    // Initialize products$ observable
    this.products$ = this.userService.products$;

    // Initialize product form
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Subscribe to current user so the component updates reactively
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;

      if (!this.currentUser) {
        // If no user, redirect to login
        this.router.navigate(['/login']);
        return;
      }

      // Initialize products based on user role when user is available
      this.initializeProducts();
      // Force change detection to ensure dashboard loads immediately
      this.cdr.detectChanges();
    });

    // Subscribe to product changes
    this.productsSub = this.products$.subscribe(products => {
      // mark ready when first product snapshot arrives and user is present
      if (this.currentUser && !this.ready) {
        this.ready = true;
      }
      if (this.currentUser?.role === 'seller') {
        // Update seller products
        this.sellerProducts = this.userService.getSellerProductStats(this.currentUser.id);
      }

      if (this.currentUser?.role === 'buyer') {
        // Update buy forms for each product
        products.forEach(product => {
          if (!this.buyForms[product.id]) {
            this.buyForms[product.id] = this.fb.group({
              quantity: [1, [
                Validators.required,
                Validators.min(1),
                Validators.max(product.quantity)
              ]]
            });
          } else {
            // Update max validator if quantity changed
            const control = this.buyForms[product.id].get('quantity');
            if (control) {
              control.setValidators([
                Validators.required,
                Validators.min(1),
                Validators.max(product.quantity)
              ]);
              control.updateValueAndValidity({ emitEvent: false });
            }
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  get isSeller() {
    return this.currentUser?.role === 'seller';
  }

  get isBuyer() {
    return this.currentUser?.role === 'buyer';
  }

  onAddProduct() {
    console.log('onAddProduct called');
    console.log('Form valid:', this.productForm.valid);
    console.log('Current user:', this.currentUser);
    console.log('Form value:', this.productForm.value);
    
    if (this.productForm.valid && this.currentUser && this.currentUser.role === 'seller') {
      this.isLoading = true;
      const { name, description, price, quantity } = this.productForm.value;
      
      console.log('Adding product:', { name, description, price, quantity, sellerId: this.currentUser.id });
      
      // Simulate network delay
      setTimeout(() => {
        this.userService.addProduct({
          name,
          description,
          price: +price,
          quantity: +quantity,
          sellerId: this.currentUser!.id,
          imageUrl: this.imagePreview || undefined
        });
        
        console.log('Product added successfully');
        
        // Refresh seller products
        this.sellerProducts = this.userService.getSellerProductStats(this.currentUser!.id);
        console.log('Updated seller products:', this.sellerProducts);
        
        this.productForm.reset({ name: '', description: '', price: 0, quantity: 1 });
        this.resetImageUpload();
        this.isLoading = false;
      }, 800);
    } else {
      console.log('Form validation failed or user is not a seller');
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null;
  }

  private resetImageUpload() {
    this.selectedImage = null;
    this.imagePreview = null;
  }

  onBuyProduct(productId: number) {
    if (this.currentUser?.role !== 'buyer') return;
    const form = this.buyForms[productId];
    if (form && form.valid) {
      const quantity = +form.value.quantity;
      // Redirect to payment page instead of buying directly
      this.router.navigate(['/payment', productId, quantity]);
    }
  }

  // Helper methods for template calculations
  getTotalProducts(): number {
    if (!this.currentUser) return 0;
    const products = this.userService.getSellerProductStats(this.currentUser.id);
    return products.length;
  }

  getTotalSales(): number {
    if (!this.currentUser) return 0;
    const products = this.userService.getSellerProductStats(this.currentUser.id);
    return products.reduce((sum: number, p: any) => sum + p.sold, 0);
  }

  getTotalRevenue(): number {
    if (!this.currentUser) return 0;
    const products = this.userService.getSellerProductStats(this.currentUser.id);
    return products.reduce((sum: number, p: any) => sum + (p.sold * p.price), 0);
  }

  getTotalInventory(): number {
    if (!this.currentUser) return 0;
    const products = this.userService.getSellerProductStats(this.currentUser.id);
    return products.reduce((sum: number, p: any) => sum + p.remaining, 0);
  }
}
