import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  key = "";
  data = null;
  name = null;
  constructor(private fb: FirebaseService,private storage: Storage) { }

  ngOnInit() {
  }
  async getUser() {
    this.fb.db.collection('users').doc(this.key).get().then(doc => {
      if (doc.exists) {
        this.data = doc.data();
        this.name = doc.data().name;
      }
    });
  }
  addContact() {
    this.storage.get(this.fb.USER_ID).then( val => {
      let final = JSON.parse(val);
      final.friend = this.data;
      this.fb.db.collection('users').doc(final.email).update(final).then(() => {
        console.log('updated');
      });
    });
  }
}
