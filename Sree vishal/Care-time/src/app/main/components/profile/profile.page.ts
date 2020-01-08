import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  profile = {
    name: null,
    email: null,
    mobile: null,
  };
  constructor(private storage: Storage, private fbService: FirebaseService, private toast: ToastController) {
  }
  ngOnInit() {
    this.storage.get(this.fbService.USER_ID).then(val => {
      if(val) {
        this.loadData(val);
      } else {
        this.toast.create({
          header:'Sorry!',
          message:'Something went wrong please login again',
          color:'danger',
          position:'middle',
          duration:4000
        }).then(t=>{
          t.present()
        });
      }
    });
  }

  loadData(val) {
    let doc = JSON.parse(val);
    this.profile.name = doc.name;
    this.profile.email = doc.email;
    this.profile.mobile = doc.mobile;
  }
}
