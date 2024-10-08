import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  // Sign In with email and password
  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in:', result);

      const token = await result.user.getIdToken();
      localStorage.setItem('authToken', token);

      this.router.navigate(['/bpm/bpm000']);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  // Sign Up with email and password
  async signUp(email: string, password: string, name: string) {
    try {
      console.log('User signup:', email,  password);
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered:', result);

      // Save the username in Firestore under the user's UID
      await setDoc(doc(this.firestore, 'users', result.user.uid), {
        name: name,
        email: email,
      });

      const token = await result.user.getIdToken();
      localStorage.setItem('authToken', token);

      this.router.navigate(['/bpm/bpm000']);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  }

  // Sign Out
  async logout() {
    try {
      await signOut(this.auth);
      console.log('User signed out');

      localStorage.removeItem('authToken');

      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
