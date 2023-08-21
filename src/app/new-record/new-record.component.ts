import { Component, Input, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  @Input() records: any
  recordForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private recordService: RecordService
  ) {
    this.recordForm = this.formBuilder.group({
      
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['editedRecord']) {
        const editRecordId = JSON.parse(params['editedRecord']) as any;
        // const recordToEdit = this.recordService.getRecordById(editRecordId);
        this.recordForm = this.formBuilder.group({
          id: [editRecordId.id],
          name: [editRecordId.name],
          email: [editRecordId.email],
          occupation: [editRecordId.occupation],
          age: [editRecordId.age]
        });
        this.isEditMode = true;
      }else {
        this.recordForm = this.formBuilder.group({
          name: [''],
          email: [''],
          occupation: [''],
          age: ['']
        })
      }
    });
  }

  createOrUpdateRecord() {
    if (this.recordForm.valid) {
      const formValue = this.recordForm.value;
      const updatedRecord = {
        id: formValue.id,
        name: formValue.name,
        email: formValue.email,
        occupation: formValue.occupation,
        age: formValue.age,
      };
      if (this.isEditMode) {
        // Update existing record
        updatedRecord.id = this.recordForm.value.id; // Set the ID field
        this.recordService.updateRecord(updatedRecord).subscribe(
          () => {
            this.router.navigate(['/body/table']);
          },
          (error) => {
            console.error('Error updating record:', error);
          }
        );
      } else {
        // Create a new record
        this.recordService.createRecord(updatedRecord).subscribe(
          () => {
            this.router.navigate(['/body/table']);
          },
          (error) => {
            console.error('Error creating record:', error);
          }
        );
      // if (this.isEditMode) {
      //   this.recordService.updateRecord(updatedRecord);
      // } else {
      //   this.recordService.createRecord(updatedRecord);
      // }
      // this.router.navigate(['/body/table']);
    }}
  }
  
}
// private generateUniqueId(): number {
//   return Math.floor(Math.random() * 1000);
// }
// public handleEdit(): void {
//   this.recordForm.controls['editId'].setValue(this.recordForm.value)
// }
