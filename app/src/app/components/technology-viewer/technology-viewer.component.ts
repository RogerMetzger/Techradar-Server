import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-viewer',
  templateUrl: './technology-viewer.component.html',
  styleUrls: ['./technology-viewer.component.scss']
})
export class TechnologyViewerComponent implements OnInit {

  rings = [
    {name: 'Adopt'},
    {name: 'Trial'},
    {name: 'Assess'},
    {name: 'Hold'}
  ];

  categories = [
    {name: 'Techniques'},
    {name: 'Tools'},
    {name: 'Platforms'},
    {name: 'Languages & Frameworks'}
  ];
  technologies: Technology[] = [];

  constructor(private technologyService: TechnologyService) {
    this.loadTechnologies(); 
  }

  ngOnInit(): void {  
    
  }

  loadTechnologies() {
    this.technologyService.getAll().subscribe({
      next: technologies => this.technologies = technologies,
      error: error => console.log(error)
    });
  }

  filterTechnologies(category: string, ring: string) {
    return this.technologies.filter(x => x.isPublic && x.category == category && x.ring == ring);
  }
}
