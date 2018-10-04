import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { Item } from '../models/Item';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs:AngularFirestore) {

    //this.items=this.afs.collection('items').valueChanges(); //.value will return the collection as a observabe but not id so we have to write getMethod
    
    this.itemsCollection=this.afs.collection('items', ref => ref.orderBy('title', 'desc'));

    this.items=this.afs.collection('items').snapshotChanges().pipe(map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Item;
        data.id=a.payload.doc.id;
        return data;
      });
    }));
   }

   getItems(){
     return this.items;
   }

   addItem(item: Item){
     this.itemsCollection.add(item);
   }

   deleteItem(item : Item){
     this.itemDoc=this.afs.doc(`items/${item.id}`);
     this.itemDoc.delete();
   }

   
   updatesItem(item : Item){
    this.itemDoc=this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}

