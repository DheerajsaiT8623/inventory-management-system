import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Product } from '../../core/models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  product: Product | null = null;
  quantity: number = 1;
  totalAmount: number = 0;
  isProcessing = false;
  paymentSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardHolder: ['', Validators.required],
      billingAddress: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      state: ['', Validators.required]
    });

    // Get product and quantity from route params
    this.route.params.subscribe(params => {
      const productId = +params['productId'];
      this.quantity = +params['quantity'] || 1;
      
      this.userService.products$.subscribe(products => {
        this.product = products.find(p => p.id === productId) || null;
        if (this.product) {
          this.totalAmount = this.product.price * this.quantity;
        }
      });
    });
  }

  onSubmit() {
    if (this.paymentForm.valid && this.product) {
      this.isProcessing = true;
      
      // Simulate payment processing
      setTimeout(() => {
        // Process the purchase
        const success = this.userService.buyProduct(this.product!.id, this.quantity);
        
        if (success) {
          this.paymentSuccess = true;
          this.isProcessing = false;
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        } else {
          this.isProcessing = false;
          // Handle payment failure
        }
      }, 2000);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}