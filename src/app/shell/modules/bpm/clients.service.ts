import {Injectable} from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private firestore: Firestore) {
  }

  async addClients(firstName: string, lastName: string, plusPoints: number): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'clients'), {
        firstName: firstName,
        lastName: lastName,
        plusPoints: plusPoints
      });
      console.log('Client added successfully with ID:', docRef.id); // docRef.id contains the generated document ID
      return docRef.id;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  }

  async getClient(clientId: string) {
    try {
      const clientRef = doc(this.firestore, 'clients', clientId); // Get a reference to the client document
      const clientDoc = await getDoc(clientRef); // Retrieve the document

      if (clientDoc.exists()) {
        console.log('Client data:', clientDoc.data());
        return clientDoc.data(); // Return the client data
      } else {
        console.error('No such client found!');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving client:', error);
      throw error;
    }
  }

  async getClients(clientId: string | null, firstName: string | null, lastName: string | null) {
    const queryConstraints = [];

    // Build query based on provided parameters
    if (clientId) {
      return this.getClientById(clientId);
    }

    if (firstName) {
      queryConstraints.push(where('firstName', '>=', firstName));
      queryConstraints.push(where('firstName', '<=', firstName + '\uf8ff')); // For prefix matching
    }

    if (lastName) {
      queryConstraints.push(where('lastName', '>=', lastName));
      queryConstraints.push(where('lastName', '<=', lastName + '\uf8ff')); // For prefix matching
    }

    // Create a query with the constraints
    const queryRef = query(collection(this.firestore, 'clients'), ...queryConstraints);
    const querySnapshot = await getDocs(queryRef);

    // Map the results to include the document ID
    const clientsData = querySnapshot.docs.map(doc => ({
      clientId: doc.id, // Change this to clientId as per your requirement
      ...doc.data(),
    }));

    return clientsData;
  }

  // In your service method
  async getClientById(clientId: string): Promise<any> {
    try {
      const clientRef = doc(this.firestore, `clients/${clientId}`);
      const clientSnapshot = await getDoc(clientRef);
      console.log(clientSnapshot)
      if (clientSnapshot.exists()) {
        return [{ clientId: clientSnapshot.id, ...clientSnapshot.data() }];
      } else {
        console.log('No client found with the given ID.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching client by ID:', error);
      return null;
    }
  }

}
