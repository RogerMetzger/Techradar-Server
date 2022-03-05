import { Component } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-administration',
  templateUrl: './technology-administration.component.html',
  styleUrls: ['./technology-administration.component.scss']
})
export class TechnologyAdministrationComponent {

  data: Technology[] = [];
  displayedColumns = ['name', 'isPublic', 'category', 'ring', 'options'];

  constructor(private technologyService: TechnologyService) {
    this.loadTechnologies();
  }

  loadTechnologies() {
    this.technologyService.getAll().subscribe({
      next: technologies => this.data = technologies,
      error: error => console.log(error)
    });
  }

  edit(id: any) {
    console.log(id);
  }

  publish(id: any) {
    console.log(id);
  }

  classify(id: any) {
    console.log(id);
  }

  delete(id: string) {
    this.technologyService.delete(id).subscribe({
      next: () => this.loadTechnologies(),
      error: error => console.log(error)
    });
  }
}
