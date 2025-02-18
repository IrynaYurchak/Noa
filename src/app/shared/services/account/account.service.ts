import { Injectable } from '@angular/core';
import { ILogin } from '../../interfaces/account/account.interface';
import { Firestore, collection, CollectionReference, DocumentData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.userCollection = collection(this.afs, 'users');
  }

  getOne(id: string): Observable<any> {
    const userDocRef = doc(this.afs, `users/${id}`);
    return docData(userDocRef, { idField: 'id' });
  }

  update(user: ILogin, id: string): Promise<void> {
    const userDocRef = doc(this.afs, `users/${id}`);
    return updateDoc(userDocRef, { ...user });
  }

}

