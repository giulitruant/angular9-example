import { Component, OnInit } from '@angular/core';
import { RiskService } from '../risk.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, NgForm } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {

  loading = false;
  chofererFormGroup: FormGroup;
  chofer: FormArray;

  choferes = null;

  constructor(private service: RiskService,
              private fb: FormBuilder) { }

  ngOnInit() {
    debugger;
    
    
    this.getFieldConfig();

  }

  getFieldConfig(){
    debugger;

    

    this.loading = true;
    this.service.getChoferes()
    .pipe(finalize(() => this.loading = false))
    .subscribe((resp) => {

      this.choferes = resp;

      this.chofererFormGroup = this.fb.group({
        chofer: this.fb.array([])
      })

      this.choferes.forEach(element => {
        const holderGroup = this.createItem(element);
        this.chofer.push(holderGroup);
      });



      console.dir(this.chofer);
      console.dir(this.chofererFormGroup.get('chofer'));
      // this.chofererFormGroup = this.fb.group({
      //   choferes: this.fb.array([this.createItem()])
      // })


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

  createItemEmpty(): FormGroup {
    return this.fb.group({
      Cuil: '',
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Email: '',
      Provincia: '',
      Localidad: '',
      Domicilio: ''
    });
  }

  addItem(item: any): void {
    this.chofer = this.chofererFormGroup.get('chofer') as FormArray;
    this.chofer.push(this.createItem(item));
  }

  save(): void {
    console.log('Form Status');
    //console.log('Form Touched', form.touched);        
  }

}
