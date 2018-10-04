import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';



import { Item } from '../../models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item={
    title:'',
    description:''

  }

  constructor(private ItemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.item.title!='' && this.item.description!=''){
      this.ItemService.addItem(this.item);
      this.item.title='';
      this.item.description='';
    }
  }

}
