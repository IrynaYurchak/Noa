import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {collection, DocumentData, query, where} from "@firebase/firestore";
import {from, map, Observable} from "rxjs";
import {IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollections!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.productCollections = collection(this.afs, 'products');
  }

  getAll(): Observable<IProductResponse[]> {
    return collectionData(this.productCollections, { idField: 'id' }).pipe(
      map(categories => categories as IProductResponse[])
    );
  }
  getAllByCategory(categoryName: string){
    const categoryQuery = query(
      this.productCollections,
      where('category', '==', categoryName)
    );
    return collectionData(categoryQuery, { idField: 'id' });
  }
  getOne(id:string) {
    const productDocRef=doc(this.afs, `products/${id}`)
    return docData(productDocRef, {idField: 'id'})
  }
  create(product: IProductRequest): Observable<IProductResponse> {
    return from(
      addDoc(this.productCollections, product).then((docRef) => ({
        id: docRef.id,
        ...product,
      }) as IProductResponse)
    );
  }

  update(product:IProductRequest, id:string){
    const productDocRef=doc(this.afs, `products/${id}`);
    return updateDoc(productDocRef, {...product})
  }

  delete(id:string){
    const productDocRef=doc(this.afs, `products/${id}`);
    return deleteDoc(productDocRef)
  }
}

