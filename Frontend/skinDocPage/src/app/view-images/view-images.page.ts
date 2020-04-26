import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {AuthService} from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.page.html',
  styleUrls: ['./view-images.page.scss'],
})
export class ViewImagesPage implements OnInit {

  public userEmail:any;
  images = [];
  imagePath;
  photo = {path:""}

  constructor(private httpService: HttpService,private authService: AuthService, private toastService: ToastService,private alertCtrl: AlertController) {
   }

  ngOnInit() {

    
  }

  buttonReload(){
    this.images=[];
    this.authService.userEmail$.subscribe((res: any) => {
      this.userEmail = res;
    });
    this.reloadImages(this.userEmail);
  }


  reloadImages(userEmail:any){
    this.httpService.getImages(userEmail).then((res) => {
      this.images = JSON.parse(res.data) ;
      
    })

  }

  async imageDelete(index){
    const confirm = await this.alertCtrl.create({
            message: 'Sure you want to delete this photo? There is NO undo!',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.httpService.deleteImage(this.images[index].image).then((res) => {
                          this.toastService.presentToast('Image Successfully Deleted');
                          this.buttonReload();
                        });
                        
                    }
                }
            ]
        });
        await confirm.present();

  }


}
