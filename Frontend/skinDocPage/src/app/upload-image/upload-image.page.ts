import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';



@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.page.html',
    styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
    public photos: any;
    public base64Image: string;
    public respond:any;
    imageD = {firstName: null, lastName: null,age: null, contactNo: null, email: null};
    public prediction:any;
    public accuracy:any;

    public userToken: any;
    public userFirstName: any;
    public userLastName: any;
    public userAge: any;
    public userContactNo: any;
    public userEmail: any;

    constructor(private toastService: ToastService,private httpService: HttpService,private authService: AuthService,private actionSheetController: ActionSheetController,public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.photos = [];
        this.authService.userToken$.subscribe((res: any) => {
            this.userToken = res;
            console.log(this.userToken);
        });
        this.authService.userFirstName$.subscribe((res: any) => {
            this.userFirstName = res;
            console.log(this.userFirstName);
        });
        this.authService.userLastName$.subscribe((res: any) => {
            this.userLastName = res;
            console.log(this.userLastName);
        });
        this.authService.userAge$.subscribe((res: any) => {
            this.userAge = parseInt(res) ;
            console.log(this.userAge);
        });

        this.authService.userContactNo$.subscribe((res: any) => {
            this.userContactNo = parseInt(res);
            console.log(this.userContactNo);
        });
        this.authService.userEmail$.subscribe((res: any) => {
            this.userEmail = res;
            console.log(this.userEmail);
        });
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

    async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image Source",
            buttons:[{
                text: 'Load From Library',
                handler: () => {
                    this.takePhoto(0);
                }
            },
            {
                text:'Use Camera',
                handler: () => {
                    this.takePhoto(1);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
        });
        await actionSheet.present();
    }

    takePhoto(sourceType  :number) {
        const options: CameraOptions = {
            quality: 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType:sourceType,
        };
        this.camera.getPicture(options) .then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.photos.push(this.base64Image);
            this.sendData(this.base64Image);
            this.photos.reverse();
        }, (err) => {
            console.log(err);
        });
    }

    

    sendData(imageData) {
        this.imageD.firstName = this.userFirstName;
        this.imageD.lastName = this.userLastName;
        this.imageD.age = this.userAge;
        this.imageD.contactNo = this.userContactNo;
        this.imageD.email = this.userEmail;
        console.log(imageData);
        this.httpService.uploadFile(imageData,this.imageD).then((result) => {
            this.toastService.presentToast('upload successfull');
            this.respond = JSON.parse(result.response);
            this.prediction = this.respond.created.prediction;
            this.accuracy = parseInt( this.respond.created.percentage);

        },(err) =>{
            this.toastService.presentToast("A error has been occured");
        } )
    }


}

