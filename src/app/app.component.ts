import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  documents: any[] = [];
  form: FormGroup;
  isEditing = false;
  currentDocumentId: string | null = null;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadDocuments();
  }

  async loadDocuments() {
    this.documents = await this.firebaseService.getDocuments();
  }

  async submitForm() {
    const { title, description } = this.form.value;
    if (this.isEditing) {
      await this.firebaseService.updateDocument(this.currentDocumentId!, { title, description });
      this.isEditing = false;
    } else {
      await this.firebaseService.createDocument({ title, description });
    }
    this.form.reset();
    this.loadDocuments();
  }

  editDocument(document: any) {
    this.isEditing = true;
    this.currentDocumentId = document.id;
    this.form.patchValue({ title: document.title, description: document.description });
  }

  async deleteDocument(id: string) {
    await this.firebaseService.deleteDocument(id);
    this.loadDocuments();
  }
}
