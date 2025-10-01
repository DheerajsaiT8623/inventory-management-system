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
  public showRepeatPopup = false;
  public isLoading = false;

  constructor(private fb: FormBuilder, public userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }



  closePopup() {
    this.showRepeatPopup = false;
    // If user exists, log them in via the service so currentUser$ is updated
    const user = this.userService.loginUser(this.loginForm.value.email);
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    const { name, email, role } = this.loginForm.value;
    
    // Simulate a brief loading state
    setTimeout(() => {
      const result = this.userService.addUser(name, email, role);
      
      if (result.isRepeated) {
        this.showRepeatPopup = true;
        this.isLoading = false;
        return;
      }

      // The service already sets currentUser when creating a new user,
      // so just navigate to the dashboard.
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 800); // Add a small delay to show loading state
  }
}
