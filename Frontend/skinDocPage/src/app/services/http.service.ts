import { HTTP } from '@ionic-native/http/ngx';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP, private fileTransfer:FileTransfer, private file: File) { }

  post(serviceName: string, data: any) {

    const url = 'http://192.168.1.101:3000/users/' + serviceName;
    console.log(url);
    
    return this.http.post(url, {email : data.email, password : data.password} , {});
  }


  uploadFile(img,imageDetails){
    const url = 'http://192.168.1.101:3000/images';

    var random = Math.floor(Math.random()*100);

    var options : FileUploadOptions ={
      fileKey: 'image',
      fileName: 'skinDoc_' + random + '.jpg',
      httpMethod:'post',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      params:{
        'firstName': imageDetails.firstName, 
        'lastName': imageDetails.lastName,
        'age': imageDetails.age, 
        'contactNo': imageDetails.contactNo, 
        'email': imageDetails.email
      }
    }

    const fileTransfer = this.fileTransfer.create();
    console.log(img);
    return fileTransfer.upload(img,url,options);
  
  }


  postSignUp(serviceName: string, data: any) {
    const url = 'http://192.168.1.101:3000/users/' + serviceName;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.post(url, {firstName : data.firstName, lastName : data.lastName, age : data.age, contactNo : data.contactNo, email : data.email, password : data.password} , {});
  }

  getImages(userEmail:String){
    const url = 'http://192.168.1.101:3000/images/findImage';
    return this.http.post(url, {email: userEmail} , {});
  }

  deleteImage(imageName:any){
    const url = 'http://192.168.1.101:3000/images/deleteImage';
    return this.http.post(url,{imageName:imageName},{});
  }

}
