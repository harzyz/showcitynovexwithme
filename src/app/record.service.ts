import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private records: any[] = []
  isEditMode: boolean = false;
  // private localStorageKey = 'records'; 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    // this.loadRecords();
  }
  
  getRecords() {
    // return this.records;
    return this.http.get<any>(`${this.apiUrl}/records`);
  }
  
  editMode() {
    this.isEditMode = true;
  }
  createRecord(record: any) {
    return this.http.post<any>(`${this.apiUrl}/records`, record);
    // const newId = Date.now();
    // const recordWithId = { ...record, id: newId };
    // this.records.push(recordWithId);
    // this.saveRecords();
  }
  
  updateRecord(updatedRecord: any) {
    return this.http.put<any>(`${this.apiUrl}/records/${updatedRecord.id}`, updatedRecord);
    // const index = this.records.findIndex(record => record.id === updatedRecord.id);
    // if (index !== -1) {
    //   const updatedCopy = { ...this.records[index], ...updatedRecord };
    //   this.records[index] = updatedCopy;
    //   this.saveRecords();
    // }
  }

  // getRecordById(i: number): any | undefined {
  //   return this.records.find(record => record.i === i);
  // }

  searchRecords(searchText: string): any {
    const params = new HttpParams().set('q', searchText);
    return this.http.get<any>(`${this.apiUrl}/records`, { params });
  
    // return this.records.filter(record =>
    //   record.name.toLowerCase().includes(searchText.toLowerCase()) ||
    //   record.email.toLowerCase().includes(searchText.toLowerCase()) ||
    //   record.occupation.toLowerCase().includes(searchText.toLowerCase()) ||
    //   record.age.toString().includes(searchText)
    // );
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/records/${id}`);
  }

  
}
// private loadRecords() {
//   const storedRecords = localStorage.getItem(this.localStorageKey);
//   if (storedRecords) {
//     this.records = JSON.parse(storedRecords);
//   }
// }

// private saveRecords() {
//   localStorage.setItem(this.localStorageKey, JSON.stringify(this.records));
// }

// public eventEmitter: EventEmitter<any> = new EventEmitter<any>();
// addRecord(records: any): Observable<any> {
//   return this._http.post('http://localhost:3000/employees', records);
// }

// getEmployeeList(): Observable<any> {
//   return this._http.get('http://localhost:3000/employees');
// }

// deleteEmpolyee(i: number): Observable<any> {
//   return this._http.delete(`http://localhost:3000/employees/${i}`);
// }

// public handleEdit(): void {
//   this.recordForm.controls['editId'].setValue(this.recordForm.value)
// }

// handleEdit() {
//   this.recordForm.controls['editId'].setValue(formValue)
// }

