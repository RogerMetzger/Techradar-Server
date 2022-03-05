import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TechnologyAdministrationDataSource, TechnologyAdministrationItem } from './technology-administration-datasource';

@Component({
  selector: 'app-technology-administration',
  templateUrl: './technology-administration.component.html',
  styleUrls: ['./technology-administration.component.scss']
})
export class TechnologyAdministrationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TechnologyAdministrationItem>;
  dataSource: TechnologyAdministrationDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'options'];

  constructor() {
    this.dataSource = new TechnologyAdministrationDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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

  delete(id: any) {
    console.log(id);
  }
}
