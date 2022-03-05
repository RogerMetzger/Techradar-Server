import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.scss']
})
export class TechnologyEditComponent {
  technologyForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required],
    ring: 'None',
    classification: null
  });

  categories = [
    {name: 'Adopt', value: 'Adopt'},
    {name: 'Trial', value: 'Trial'},
    {name: 'Assess', value: 'Assess'},
    {name: 'Hold', value: 'Hold'}
  ];

  rings = [
    {name: 'None', value: null},
    {name: 'Techniques', value: 'Techniques'},
    {name: 'Tools', value: 'Tools'},
    {name: 'Platforms', value: 'Platforms'},
    {name: 'Languages & Frameworks', value: 'Languages & Frameworks'}
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if(this.technologyForm.valid) {
      alert('Thanks!');
    }
  }
}
