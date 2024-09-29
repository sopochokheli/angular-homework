import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Sign In with email and password
  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in:', result);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  // Sign Up with email and password
  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered:', result);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  }

  // Sign Out
  async logout() {
    try {
      await signOut(this.auth);
      console.log('User signed out');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
