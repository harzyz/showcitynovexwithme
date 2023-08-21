import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  records: any[] = [];
  record: any;
  isEditMode: boolean = false
  searchText: string = '';
  filteredItems = this.records;

  constructor(
    private recordService: RecordService,
    private router: Router,
    private modalService: NgbModal
    ) {
  }
    
  ngOnInit(): void {
    this.loadRecords();
    
  }

  loadRecords() {
    this.recordService.getRecords().subscribe(
      (data: any[]) => {
      this.records = data;
    },err=>{
      alert('There is Problem')
    });
  }


  onDeleteConfirm(content: any, i: number): void {
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm') {
        this.onDelete(i);
      }
    });
  }

  onDelete(i: number): void {
    const recordToDelete = this.records[i];
  if (recordToDelete) {
    this.recordService.deleteRecord(recordToDelete.id).subscribe(
      () => {
        this.records.splice(i, 1);
      },
      (error) => {
        console.error('Error deleting record:', error);
      }
    );
  } else {
    console.error('Record not found');
  }
    // this.recordService.deleteRecord(id).subscribe(() => {
    //   this.loadRecords();
    // });
    // this.records.splice(i, 1)
  }

  onEdit(item: any, i: number) {
    this.record = {...item}
    this.recordService.editMode()
    this.router.navigate(['/body/new-record'], { queryParams: { editedRecord: JSON.stringify(item) }})
  }
  
  performSearch(): void {
    if (this.searchText.trim() !== '') {
      this.recordService.searchRecords(this.searchText).subscribe(
        (data: any[]) => {
          this.records = data;
        },
        (error: any) => {
          console.error('Error searching records:', error);
        }
      );
    } else {
      this.loadRecords(); // If search term is empty, reload all records
    }
  }
    // if (this.searchText.trim() === '') {
    //   this.records = this.recordService.getRecords();
    // } else {
    //   this.records = this.recordService.searchRecords(this.searchText);
    // }
  

}