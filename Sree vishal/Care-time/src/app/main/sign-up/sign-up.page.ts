import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  confirmPassword = '';
  constructor(private mdCtrl: ModalController, public userDetails: UserDetailsService, private toastCtrl: ToastController, private fbAuth: FirebaseService) {
   }
  ngOnInit() {
  }
  closePanel() {
    this.mdCtrl.dismiss();
  }
  async nextPanel() {
    if (this.confirmPassword === this.userDetails.details.password) {
      this.finish();
    } else {
      const message = 'Confirm password is not matching.';
      const toast = await this.toastCtrl.create( {
        header: 'Please check',
        message,
        position: 'middle',
        duration: 2000
      });
      toast.present();
    }
  }
  finish() {
    const details = this.userDetails.details;
    this.fbAuth.signUp(details.email, details.password, this.toJson(details)).then( () => {
      this.closePanel();
    });
  }
    toJson(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
}
