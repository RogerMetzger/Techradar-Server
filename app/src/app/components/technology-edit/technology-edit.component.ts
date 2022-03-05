import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.scss']
})
export class TechnologyEditComponent implements OnInit {

  errorMessage: string = "";
  technology: Technology | undefined;

  technologyForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required]
  });

  categories = [
    {name: 'Techniques', value: 'Techniques'},
    {name: 'Tools', value: 'Tools'},
    {name: 'Platforms', value: 'Platforms'},
    {name: 'Languages & Frameworks', value: 'Languages & Frameworks'}
  ];

  constructor(
    private fb: FormBuilder, 
    private technologyService: TechnologyService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    let technologyId = this.getTechnologyId();
    if(technologyId) {
      this.loadTechnology(technologyId);
    } else {
      this.router.navigate(['/administration']);
    }
  }

  private getTechnologyId() {
    return this.route.snapshot.paramMap.get('id');
  }

  private loadTechnology(technologyId: string) {
    this.technologyService.getById(technologyId).subscribe({
      next: tech => {
        this.technology = tech;
        this.setFormValues();
      },
      error: error => {
        console.error(error);
        this.router.navigate(['/administration']);
      }
    });
  }

  private setFormValues() {
    if(this.technology) {
      this.technologyForm.get('name')?.setValue(this.technology.name);
      this.technologyForm.get('description')?.setValue(this.technology.description);
      this.technologyForm.get('category')?.setValue(this.technology.category);
    }
  }

  onSubmit(form: any): void {
    if(this.technologyForm.valid) {
      let id = this.getTechnologyId();
      if (id) {
        this.technologyService.update(id, form).subscribe({
          next: () => this.router.navigate(['/administration']),
          error: error => {
            console.error(error);
            this.errorMessage = error.error.message;
          }
        });
      }
    }
  }
}
