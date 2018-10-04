import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../services/item.service';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items=>{    // service kay through observable data get hora hay database say or phr subscribe data show krwanay mein madad kr raha hay
      //console.log(items);
      this.items=items;// ab html mein data access kr sktay hain
      //console.log(this.items);
    })
  }

  
  clearState(){
    this.editState=false;
    this.itemToEdit=null;
  }

  deleteItem(event, item : Item){
    this.clearState();
    this.itemService.deleteItem(item);
  }
 
  editItem(event, item : Item){
    this.editState=true;
    this.itemToEdit=item;
  }

  updateItem(item: Item){
    this.itemService.updatesItem(item);
    this.clearState();
  }


}
 