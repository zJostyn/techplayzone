import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public insertModalVisible = new BehaviorSubject<boolean>(false);
  public editModalVisible = new BehaviorSubject<boolean>(false);

  insertModalVisible$ = this.insertModalVisible.asObservable();
  editModalVisible$ = this.editModalVisible.asObservable();

  showInsertModal() {
    this.insertModalVisible.next(true);
  }

  hideInsertModal() {
    this.insertModalVisible.next(false);
  }

  showEditModal() {
    this.editModalVisible.next(true);
  }

  hideEditModal() {
    this.editModalVisible.next(false);
  }

}
