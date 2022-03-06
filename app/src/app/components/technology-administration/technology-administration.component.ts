import { Component } from '@angular/core';
import { Access } from 'src/app/models/access.model';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';
import { UserSessionService } from 'src/app/services/user-session.service';

@Component({
  selector: 'app-technology-administration',
  templateUrl: './technology-administration.component.html',
  styleUrls: ['./technology-administration.component.scss']
})
export class TechnologyAdministrationComponent {

  canDelete = Access.DELETE;
  canPublish = Access.PUBLISH;
  
  data: Technology[] = [];
  displayedColumns = ['name', 'category', 'ring', 'isPublic', 'options'];

  constructor(private technologyService: TechnologyService, private userSession: UserSessionService) {
    this.loadTechnologies();
  }

  loadTechnologies() {
    this.technologyService.getAll().subscribe({
      next: technologies => this.data = technologies,
      error: error => console.log(error)
    });
  }

  canAccess = (access: Access) => {
    return this.userSession.canAccess(access);
  }

  delete(id: string) {
    this.technologyService.delete(id).subscribe({
      next: () => this.loadTechnologies(),
      error: error => console.log(error)
    });
  }
}
