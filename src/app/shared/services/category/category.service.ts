import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc, docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import { DocumentData, collection} from "@firebase/firestore";
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category.interface';
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollections!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.categoryCollections = collection(this.afs, 'categories');
  }

  getAll(): Observable<ICategoryResponse[]> {
    return collectionData(this.categoryCollections, { idField: 'id' }).pipe(
      map(categories => categories as ICategoryResponse[])
    );
  }
  getOne(id:string) {
    const categoryDocRef=doc(this.afs, `categories/${id}`)
    return docData(categoryDocRef, {idField: 'id'})
  }
  create(category:ICategoryRequest){
    return addDoc(this.categoryCollections, category)
  }

  update(category:ICategoryRequest, id:string){
    const categoryDocRef=doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocRef, {...category})
  }

  delete(id:string){
    const categoryDocRef=doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocRef)
  }
}
