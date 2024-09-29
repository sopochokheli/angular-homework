import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc, doc,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.accountsCollection = collection(this.firestore, 'accounts');
  }

  async addAccount(clientId: string, accountName: string, amount: number): Promise<void> {
    try {
      await addDoc(this.accountsCollection, {
        clientId: clientId,   // Foreign key for clientId
        accountName: accountName,
        amount: amount
      });
      console.log('Account added successfully!');
    } catch (error) {
      console.error('Error adding account:', error);
    }
  }

  async getAccounts(clientId: string): Promise<any[]> {
    const accounts: any[] = [];
    try {
      const q = query(this.accountsCollection, where('clientId', '==', clientId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        accounts.push({id: doc.id, ...doc.data()});
      });
      return accounts;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      return [];
    }
  }

  async deleteAccount(accountId: string): Promise<void> {
    try {
      const accountRef = doc(this.firestore, `accounts/${accountId}`);
      await deleteDoc(accountRef);
      console.log(`Account with ID ${accountId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error; // Rethrow or handle the error as needed
    }
  }
}
