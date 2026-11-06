import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})


export class SelectComponent implements OnInit {
  // from parent to child : @Input()
  @Input() title : string = " "
  @Input() data : any[] = [] 
  @Input() all: boolean = true ;
  @Input() select ='';
  // from child to parent : @Output
  @Output() selectedValue = new EventEmitter()

// categories: any;

constructor() {}
ngOnInit() : void {

}
detectChanges(event : any)  {
this.selectedValue.emit(event)
}

}

