import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { UserRole, Product } from '../../core/models/models';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public showRepeatPopup = false;
  public isLoading = false;
  public isSignupMode = false;
  public errorMessage = '';

  constructor(private fb: FormBuilder, public userService: UserService, private router: Router) {
    // Sign In form (only email)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Sign Up form (full profile)
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: [''],
      company: ['']
    });
  }

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }



  onSignIn() {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    const { email } = this.loginForm.value;
    
    setTimeout(() => {
      // Check if user exists
      const user = this.userService.loginUser(email);
      
      if (user) {
        // User exists, log them in
        this.router.navigate(['/dashboard']);
      } else {
        // User doesn't exist, show error
        this.errorMessage = 'Account not found. Please sign up first.';
      }
      
      this.isLoading = false;
    }, 500);
  }

  onSignUp() {
    if (this.signupForm.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    const { name, email, role, phone, company } = this.signupForm.value;
    
    setTimeout(() => {
      const result = this.userService.addUser(name, email, role);
      
      if (result.isRepeated) {
        // User already exists
        this.errorMessage = 'Account already exists. Please sign in instead.';
        this.isLoading = false;
        return;
      }
      
      // New user created, log them in
      this.userService.loginUser(email);
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 800);
  }

  closePopup() {
    this.showRepeatPopup = false;
    const email = this.loginForm.value.email;
    const user = this.userService.loginUser(email);
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }
}
