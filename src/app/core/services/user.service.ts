import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserRole, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUser = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  private users = new BehaviorSubject<User[]>(this.loadUsersFromStorage() || [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'seller' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'buyer' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'seller' }
  ]);
  private products = new BehaviorSubject<Product[]>((() => {
    const stored = this.loadProductsFromStorage();
    if (stored && stored.length > 0) return stored;
    
    // Initialize with default products if storage is empty
    const defaultProducts = [
      { id: 1, name: 'Laptop', description: 'High-performance Gaming Laptop', price: 85000, quantity: 5, sellerId: 1 },
      { id: 2, name: 'Phone', description: 'Latest Smartphone', price: 55000, quantity: 10, sellerId: 3 },
      { id: 3, name: 'Tablet', description: '10-inch Tablet', price: 35000, quantity: 8, sellerId: 1 },
      { id: 4, name: 'Headphones', description: 'Wireless Noise-Canceling', price: 15000, quantity: 15, sellerId: 3 }
    ];
    
    // Save default products to storage
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
  })());
  private nextUserId = this.users.value.reduce((max, user) => Math.max(max, user.id), 0) + 1;
  private nextProductId = this.products.value.reduce((max, product) => Math.max(max, product.id), 0) + 1;

  // Track sales: productId -> sold count
  private productSales = new Map<number, number>();

  currentUser$ = this.currentUser.asObservable();
  users$ = this.users.asObservable();
  products$ = this.products.asObservable();

  constructor() {
    // Service initialized
  }

  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private loadUsersFromStorage(): User[] | null {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : null;
  }

  private loadProductsFromStorage(): Product[] | null {
    const productsJson = localStorage.getItem('products');
    return productsJson ? JSON.parse(productsJson) : null;
  }

  private saveToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser.value));
    localStorage.setItem('users', JSON.stringify(this.users.value));
    localStorage.setItem('products', JSON.stringify(this.products.value));
  }

  // Cache for repeated user check
  private userCache = new Map<string, User>();

  loginUser(email: string): User | null {
    const user = this.users.value.find(u => u.email === email) || null;
    if (user) {
      this.currentUser.next(user);
      this.saveToStorage();
    }
    return user;
  }

  logoutUser() {
    this.currentUser.next(null);
    this.saveToStorage();
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  addUser(name: string, email: string, role: UserRole): { user: User, isRepeated: boolean } {
    const existing = this.users.value.find(u => u.email === email);
    if (existing) {
      return { user: existing, isRepeated: true };
    }
    const user: User = { id: this.nextUserId++, name, email, role };
    this.users.next([...this.users.value, user]);
    this.userCache.set(email, user);
    this.saveToStorage();
    return { user, isRepeated: false };
  }

  deleteUser(id: number) {
    if (this.currentUser.value?.id === id) {
      this.logoutUser();
    }
    this.users.next(this.users.value.filter(u => u.id !== id));
    this.products.next(this.products.value.filter(p => p.sellerId !== id));
    this.saveToStorage();
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = { ...product, id: this.nextProductId++ };
    console.log('UserService: Adding product:', newProduct);
    
    this.products.next([...this.products.value, newProduct]);
    this.productSales.set(newProduct.id, 0);
    this.saveToStorage();
    
    console.log('UserService: Products after adding:', this.products.value);
  }

  purchaseProduct(productId: number, quantity: number): { success: boolean; error?: string } {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'User not logged in' };
    }

    if (currentUser.role !== 'buyer') {
      return { success: false, error: 'Only buyers can purchase products' };
    }

    const product = this.products.value.find(p => p.id === productId);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (product.quantity < quantity) {
      return { success: false, error: 'Insufficient stock available' };
    }

    // Update product quantity
    const updatedProducts = this.products.value.map(p => {
      if (p.id === productId) {
        return { ...p, quantity: p.quantity - quantity };
      }
      return p;
    });

    // Update sales tracking
    this.productSales.set(productId, (this.productSales.get(productId) || 0) + quantity);
    this.products.next(updatedProducts);
    this.saveToStorage();

    return { success: true };
  }

  getProductSales(productId: number): number {
    return this.productSales.get(productId) || 0;
  }

  buyProduct(productId: number, quantity: number): boolean {
    const products = this.products.value.map(p => {
      if (p.id === productId && p.quantity >= quantity) {
        return { ...p, quantity: p.quantity - quantity };
      }
      return p;
    });
    const found = this.products.value.find(p => p.id === productId && p.quantity >= quantity);
    if (found) {
      this.products.next(products);
      // Track sales
      const sold = this.productSales.get(productId) || 0;
      this.productSales.set(productId, sold + quantity);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // For seller dashboard: get stats for their products
  getSellerProductStats(sellerId: number) {
    const sellerProducts = this.products.value.filter(p => p.sellerId === sellerId);
    
    return sellerProducts.map(p => ({
      ...p,
      sold: this.productSales.get(p.id) || 0,
      remaining: p.quantity
    }));
  }

  // For repeated user popup
  isRepeatedUser(email: string): boolean {
    return !!this.users.value.find(u => u.email === email);
  }
}
