import { Injectable } from '@angular/core';
import {skinClinic} from './skinClinic.model';

@Injectable({
  providedIn: 'root'
})
export class InquireSkinClinicService {
  private _clinics: skinClinic[] = [
    new skinClinic(
        'p1',
        'Durdan Hospital',
        '"Durdans Hospital is a multi-speciality private hospital that treats patients visiting from around the world, in Colombo, Sri Lanka."',
        'https://www.durdans.com/wp-content/uploads/2017/09/21751864_1646442848731003_4694675338382260969_n-300x200.jpg',
        'Address : 3 Alfred Pl, Colombo 00300',
        'Phone : 0112 140 000'
    ),
    new skinClinic(
        'p2',
        'Nawaloka Hospital',
        '"The entry of Nawaloka Hospitals into the state dominated healthcare sector in 1985, saw the private health care system take root in Sri Lanka."',
        'http://www.nawaloka.com/catalog/view/theme/default/image/why-us/nawaloka-hospital-slide-02.jpg',
        'Address : 23, Deshamanya H. K Dharmadasa Mawatha, Colombo 2, Sri Lanka',
        'Phone : 0115 577 111'
    ),
    new skinClinic(
        'p3',
        'Skin Clinic Colombo',
        '"Discover the finest skin care clinic in Sri Lanka. Dermatology experts from our clinic are here to help you to gain and maintain a beautiful skin"',
        'https://media.timeout.com/images/103758149/1024/576/image.jpg',
        'Address : 32 Lauries Rd, Colombo 00400',
        'Phone : 0112 588 679'
    )
  ];

  get clinics() {
    return [...this._clinics];
  }

  constructor() { }
}
