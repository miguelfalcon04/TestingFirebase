import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = getFirestore(initializeApp(environment.firebaseConfig));

  private collectionName = 'ProbandoCRUD'; // Nombre de tu colección

  // Crear documento
  async createDocument(data: { title: string; description: string }) {
    return await addDoc(collection(this.firestore, this.collectionName), data);
  }

  // Leer documentos
  async getDocuments() {
    const snapshot = await getDocs(collection(this.firestore, this.collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Actualizar documento
  async updateDocument(id: string, data: { title: string; description: string }) {
    const docRef = doc(this.firestore, this.collectionName, id);
    return await updateDoc(docRef, data);
  }

  // Borrar documento
  async deleteDocument(id: string) {
    const docRef = doc(this.firestore, this.collectionName, id);
    return await deleteDoc(docRef);
  }
}
