import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {AuthService} from '../services/auth.service';
import { ToastService } from '../services/toast.service';

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

  constructor(private httpService: HttpService,private authService: AuthService, private toastService: ToastService) {
   }

  ngOnInit() {
    
    
    
  }
  clicked(){
    this.toastService.presentToast(this.photo.path);
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
  imageDelete(imageName){
    this.httpService.deleteImage(imageName).then((res) => {
      this.toastService.presentToast('Image Successfully deleted');
    })
    this.buttonReload();
  }


}
