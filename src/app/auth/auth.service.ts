import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
  }

  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);

      const token = await result.user.getIdToken();
      localStorage.setItem('authToken', token);

      this.router.navigate(['/bpm/bpm000']);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  async signUp(email: string, password: string, name: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);

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

  async logout() {
    try {
      await signOut(this.auth);

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
