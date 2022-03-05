import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-classify',
  templateUrl: './technology-classify.component.html',
  styleUrls: ['./technology-classify.component.scss']
})
export class TechnologyClassifyComponent implements OnInit {

  errorMessage: string = "";
  technology: Technology | undefined;

  technologyForm = this.fb.group({
    ring: [null, Validators.required],
    classification: [null, Validators.required]
  });

  rings = [
    {name: 'None', value: null},
    {name: 'Adopt', value: 'Adopt'},
    {name: 'Trial', value: 'Trial'},
    {name: 'Assess', value: 'Assess'},
    {name: 'Hold', value: 'Hold'}
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
      this.technologyForm.get('ring')?.setValue(this.technology.ring);
      this.technologyForm.get('classification')?.setValue(this.technology.classification);
    }
  }

  onSubmit(form: any): void {
    if(this.technologyForm.valid) {
      let id = this.getTechnologyId();
      if (id) {
        this.technologyService.classify(id, form).subscribe({
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
