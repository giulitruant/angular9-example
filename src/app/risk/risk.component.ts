import { Component, OnInit } from '@angular/core';
import { RiskService } from '../risk.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {

  loading = false;
  chofererFormGroup: FormGroup;
  itemsChofer: FormArray;

  choferes = null;

  constructor(private service: RiskService,
              private fb: FormBuilder) { }  
  
  ngOnInit() {
    
    this.chofererFormGroup = this.fb.group({
      itemsChofer: this.fb.array([]),
    })

    this.getFieldConfig();    
  }

  itemsChoferes(): FormArray{
    return this.chofererFormGroup.get('itemsChofer') as FormArray ; 
  }

  getFieldConfig(){
        
    this.loading = true;
    this.service.getChoferes()
    .pipe(finalize(() => this.loading = false))
    .subscribe((resp) => {

      this.choferes = resp;      

      this.choferes.forEach(element => {
        this.itemsChofer = this.chofererFormGroup.get('itemsChofer') as FormArray;
        this.itemsChofer.push(this.createItem(element));
      });
    });
  
  }

  createItem(item: any): FormGroup {    
    return this.fb.group({
      Cuil: item.Cuil,
      Nombre: item.Nombre,
      Apellido: item.Apellido,
      Telefono: item.Telefono,
      Email: item.Email,
      Provincia: item.Provincia,
      Localidad: item.Localidad,
      Domicilio: item.Domicilio
    });
  }

  addQuantity() {
    let empty: any;
    this.itemsChoferes().push(this.createItem(empty));
  }

  onSubmit(): void {
    debugger;
    for(let i = 0; i < this.itemsChofer.length; i++) {
      console.log(this.itemsChofer.at(i).value);
    } 
  }

}
