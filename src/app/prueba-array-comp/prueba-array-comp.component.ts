import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RiskService } from '../risk.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-prueba-array-comp',
  templateUrl: './prueba-array-comp.component.html',
  styleUrls: ['./prueba-array-comp.component.scss']
})
export class PruebaArrayCompComponent implements OnInit {

  json = JSON.parse("{\"conceptsWeight\":[{\"concept\":{\"id\":\"ACT\",\"text\":\"Independiente\"},\"parameter\":{\"id\":\"2\",\"text\":\"Independiente\"},\"weight\":1},{\"concept\":{\"id\":\"ACT\",\"text\":\"Independiente\"},\"parameter\":{\"id\":\"1\",\"text\":\"Asalariado\"},\"weight\":2},{\"concept\":{\"id\":\"ACT\",\"text\":\"Independiente\"},\"parameter\":{\"id\":\"3\",\"text\":\"Jubilado\"},\"weight\":3},{\"concept\":{\"id\":\"HOU\",\"text\":\"Tipo de Vivienda\"},\"parameter\":{\"id\":\"1\",\"text\":\"Alquiler\"},\"weight\":1},{\"concept\":{\"id\":\"HOU\",\"text\":\"Tipo de Vivienda\"},\"parameter\":{\"id\":\"2\",\"text\":\"Familiar\"},\"weight\":2},{\"concept\":{\"id\":\"HOU\",\"text\":\"Tipo de Vivienda\"},\"parameter\":{\"id\":\"3\",\"text\":\"Propia\"},\"weight\":3},{\"concept\":{\"id\":\"JOB\",\"text\":\"Antigüedad Empleo / Negocio\"},\"parameter\":{\"id\":\"1\",\"text\":\"Entre 0 y 6 meses\"},\"weight\":1},{\"concept\":{\"id\":\"JOB\",\"text\":\"Antigüedad Empleo / Negocio\"},\"parameter\":{\"id\":\"2\",\"text\":\"Entre 7 y 12 meses\"},\"weight\":2},{\"concept\":{\"id\":\"JOB\",\"text\":\"Antigüedad Empleo / Negocio\"},\"parameter\":{\"id\":\"3\",\"text\":\"Mayor o igual a 13 meses\"},\"weight\":3},{\"concept\":{\"id\":\"MAR - ST\",\"text\":\"Estado Civil\"},\"parameter\":{\"id\":\"S\",\"text\":\"Soltero / Unido\"},\"weight\":1},{\"concept\":{\"id\":\"MAR - ST\",\"text\":\"Estado Civil\"},\"parameter\":{\"id\":\"C\",\"text\":\"Casado\"},\"weight\":2},{\"concept\":{\"id\":\"MAR - ST\",\"text\":\"Estado Civil\"},\"parameter\":{\"id\":\"V\",\"text\":\"Viudo / Divorciado\"},\"weight\":3}],\"internalScoreRanges\":[{\"from\":null,\"to\":9,\"value\":1},{\"from\":10,\"to\":null,\"value\":2}],\"externalScoreRanges\":[{\"from\":null,\"to\":436,\"value\":1},{\"from\":437,\"to\":508,\"value\":2},{\"from\":509,\"to\":600,\"value\":3},{\"from\":601,\"to\":null,\"value\":4}],\"minFinalScore\":4,\"familyBurden\":[{\"dependentsQuantity\":0,\"usd\":0.00000},{\"dependentsQuantity\":1,\"usd\":30.00000},{\"dependentsQuantity\":2,\"usd\":50.00000},{\"dependentsQuantity\":3,\"usd\":70.00000},{\"dependentsQuantity\":4,\"usd\":100.00000}],\"lastWorstMonthlyQualification\":4,\"worstLast12MonthsQualification\":7,\"paymentCapacityPerc\":20,\"levelOfDebt\":80,\"minPaymentCapacity\":35.00000,\"ageRanges\":[{\"from\":20,\"to\":28,\"value\":1},{\"from\":29,\"to\":35,\"value\":2},{\"from\":36,\"to\":null,\"value\":3}]}");

  conceptsWeightFormGroup: FormGroup;
  conceptsWeight: FormArray;

  loading = false;

  constructor(public fb: FormBuilder,
    private service: RiskService) { }

    itemsConceptsWeight(): FormArray{
      return this.conceptsWeightFormGroup.get('conceptsWeight') as FormArray ; 
    }

  ngOnInit(): void {

    this.conceptsWeightFormGroup = this.fb.group({
      conceptsWeight: this.fb.array([]),
    });

    this.getFieldConfig(); 

  }

  getFieldConfig(){
    debugger;
        
    this.loading = true;

    const response = this.json;

    response.conceptsWeight.filter(x => x.concept.id === "ACT").forEach(element => {
      this.conceptsWeight = this.conceptsWeightFormGroup.get('conceptsWeight') as FormArray;
      this.conceptsWeight.push(this.createItem(element));
    });
  
  }

  createItem(item : any): FormGroup {
    return this.fb.group({
      conceptId: new FormControl(item.concept.id, [Validators.required]),
      conceptText: new FormControl(item.concept.text, [Validators.required]),
      parameterId: new FormControl(item.parameter.id, [Validators.required]),
      parameterText: new FormControl(item.parameter.text, [Validators.required]),
      weight: new FormControl(item.weight, [Validators.required])
    });
  } 

  onSubmit(){
    debugger;
    console.dir(this.conceptsWeightFormGroup);
  }

  ver(resp: any){
    debugger;
    console.dir(resp);

    return resp.controls.parameterText.value;

  }
  

}
