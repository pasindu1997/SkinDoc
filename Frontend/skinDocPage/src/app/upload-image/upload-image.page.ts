import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';




@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.page.html',
    styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
    public photos: any;
    public base64Image: string;

    constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.photos = [];
    }

    async deletePhoto(index) {
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
                        this.photos.splice(index, 1);
                    }
                }
            ]
        });
        await confirm.present();
    }

    takePhoto() {
        const options: CameraOptions = {
            quality: 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options) .then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.photos.push(this.base64Image);
            this.photos.reverse();
        }, (err) => {
            console.log(err);
        });
    }


}

