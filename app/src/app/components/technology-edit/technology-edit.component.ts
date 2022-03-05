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
    ring: null,
    classification: null
  });

  categories = [
    {name: 'Adopt'},
    {name: 'Trial'},
    {name: 'Assess'},
    {name: 'Hold'}
  ];

  rings = [
    {name: 'Techniques'},
    {name: 'Tools'},
    {name: 'Platforms'},
    {name: 'Languages & Frameworks'}
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if(this.technologyForm.valid) {
      alert('Thanks!');
    }
  }
}
