import { OverlayEventDetail } from '@ionic/core/components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class HistoryPage implements OnInit {
  form: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
  });

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  @ViewChild(IonModal) modal: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.editID = null;
  }

  confirm() {
    this.editID ? this.edit() : this.add();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  backendUrl = new URL('https://pageai-multiplataforma.onrender.com/');

  history: any[];
  getUsers() {
    this.http.get(`${this.backendUrl}posts`).subscribe((res: any) => {
      console.log(res);
      this.history = res;
    });
  }

  add() {
    if (this.form.invalid) console.log('invalid form');

    this.http.post(`${this.backendUrl}registro`, this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        this.history.push(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.form.reset();
        this.modal.dismiss();
      }
    );
  }

  editID: number | null = null;

  getByID(id: number) {
    this.editID = id;
    this.http.get(`${this.backendUrl}users/${id}`).subscribe((res: any) => {
      console.log(res);
      this.form.patchValue(res);
      this.modal.present();
    });
  }

  edit() {
    this.http.put(`${this.backendUrl}users/${this.editID}`, this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        this.history = this.history.map((user) =>
          user.id === this.editID ? res : user
        );
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.editID = null;
        this.form.reset();
        this.modal.dismiss();
      }
    );
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Ok',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.remove()
      },
    },
  ];

  isAlertOpen = false;
  selectedID: number | null = null;

  remove() {
    this.http.delete(`${this.backendUrl}posts/${this.selectedID}`).subscribe(
     {
        next: (res: any) => {
          console.log(res);
          this.history = this.history.filter((user) => user.id !== this.selectedID);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.selectedID = null;
          this.isAlertOpen = false;
        },
     }
    );
  }

}
