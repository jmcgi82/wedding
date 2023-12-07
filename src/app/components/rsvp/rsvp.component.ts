import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guest } from 'src/app/common/guest';
import { Party } from 'src/app/common/party';
import { RsvpDTO } from 'src/app/common/rsvp-dto';
import { RsvpApiResponse } from 'src/app/common/rsvpApiResponse';
import { RsvpService } from 'src/app/services/rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  errorMessage = '';

  partySize: number = 1;
  partyName: string = '';
  guests: Guest[] = [new Guest(0, "")];

  checkoutUrl = "http://localhost:8080/api/parties/rsvp"

  success = '';
  rsvpServiceDto: any;

  rsvpForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private rsvpService: RsvpService, private router: Router) { }

  ngOnInit(): void {

    this.rsvpService.purchaseServiceData.subscribe((party) => {
      // console.log('Excursion Detail Current Data Service:', serviceData);
      this.rsvpServiceDto = party;
    })

    this.rsvpForm = this.formBuilder.group({
      partyName: [''],
      partySize: [''],
      partyEmail: [''],
      partyPhone: [''],
      dietaryRestrictions: ['']
    });
  }

  public inc() {
    if (this.partySize == 1) {
      this.partySize = 2;
    } else {
      this.partySize += 1;
      if (this.partySize != 1) {
        this.guests[this.guests.length] = new Guest(this.guests.length, "");
      }
    }
    //console.log(this.guests.length)
  }

  public dec() {
    if (this.partySize != 1 && this.partySize != 0) {
      this.partySize -= 1;
      this.guests.splice(this.guests.length - 1, 1);
    }
  }

  public checkout() {


    console.log(this.rsvpForm.controls['partySize'].value)
    // convert data service object to plain old object for api call
    let rsvp = Object.assign({}, this.rsvpServiceDto);
    let party = new Party(1, this.rsvpForm.controls['partyName'].value, this.partySize, this.rsvpForm.controls['partyEmail'].value, this.rsvpForm.controls['partyPhone'].value, this.rsvpForm.controls['dietaryRestrictions'].value);
    let rsvpData = new RsvpDTO(party, this.success);

    //verify all fields are filled out
    let error = this.validatePhone(party.partyPhone);
    error = this.emptyFields();
    error = this.validateEmail(party.partyEmail);


    if (!error) {
      // send request to back end
      this.http.post<RsvpApiResponse>(this.checkoutUrl, rsvpData).subscribe(response => {
        this.success = response.success;
      }
      );

      console.log(this.success);
      //What to do if successful
      if (this.success == "true") {
        this.router.navigate(["/success"],).then(() => {
          window.location.reload();
        });
      } else if (this.success == "email") {
        this.errorMessage = 'A RSVP with that email already exists. If you wish to modify your RSVP, please contact us.'
        let element2 = document.getElementById('email');
        element2!.className += " error_border";
      } else if (this.success == "phone") {
        this.errorMessage = 'A RSVP with that phone already exists. If you wish to modify your RSVP, please contact us.';
        let element2 = document.getElementById('phone');
        element2!.className += " error_border";
      } else {
        this.errorMessage = '**Submission error, please try again!'
      }
    }
    //Where to go after success
    
  }

  public formatPhone() {
    let phone: string = this.rsvpForm.controls['partyPhone'].value.toLowerCase();
    if (!/\d/.test(phone.charAt(phone.length - 1))) {
      if (phone.length == 1) {
        phone = '';
      } else {
        phone = phone.substring(0, phone.length - 1);
      }
    }
    if (phone.length == 3 || phone.length == 7) {
      phone += "-";
    }
    this.rsvpForm.controls['partyPhone'].setValue(phone);
  }

  private validatePhone(phone: string): boolean {
    let error = false;
    let dash1 = false;
    let dash2 = false;

    if (this.rsvpForm.controls['partyPhone'].value == null || this.rsvpForm.controls['partyPhone'].value == '') {
      let element = document.getElementById('empty_fields');
      element!.className = element!.className.replace(" hidden", " visible");
      let element2 = document.getElementById('phone');
      element2!.className += " error_border";
      error = true;

    } else {
      let element2 = document.getElementById('phone');
      element2!.className = element2!.className.replace(" error_border", "");
    }

    if (phone.length < 10) {

      error = true;
    }

    for (let i = 0; i < phone.length; i++) {
      if (phone.charAt(i) == "-" && i == 3) {
        dash1 = true;
      }
      if (phone.charAt(i) == "-" && i == 7) {
        dash2 = true;
      }
      if (!/\d/.test(phone.charAt(i)) && !(dash1 && i == 3) && !(dash2 && i == 7)) {
        error = true;
        console.log("test");
      }
    }

    let temp = this.rsvpForm.controls['partyPhone'].value;
    if (temp.charAt(0) == 1) {
      temp = temp.substring(1);
    }


    if (!dash1 && error == false) {
      temp = temp.substring(0, 3) + "-" + temp.substring(3);
    }
    let init = false;
    if (!dash2 && error == false) {
      temp = temp.substring(0, 7) + "-" + temp.substring(7);
      init = true
    }

    if (phone.length != 12 && !init) {
      error = true;
    }

    this.rsvpForm.controls['partyPhone'].setValue(temp);

    if (error == false) {
      let element = document.getElementById("phone");
      element!.className = element!.className.replace(" error_border", "");
      return false;
    } else {
      let element = document.getElementById("phone");
      element!.className += " error_border";
      return true;
    }
  }

  private validateEmail(email: string): boolean {
    let at = false;
    let atIndex = email.length;
    let dot = false;

    for (let i = 0; i < email.length; i++) {
      if (email.charAt(i) == '@') {
        at = true;
        atIndex = i;
      }
      if (email.charAt(i) == '.' && i > atIndex) {
        dot = true;
      }
    }
    if (at && dot) {
      let element = document.getElementById("email");
      return false;
    } else {
      let element = document.getElementById('email');
      element!.className += " error_border";
      return true;
    }
  }

  private reset() {
    this.errorMessage = '';
    let element2 = document.getElementById('name');
    element2!.className = element2!.className.replace(" error_border", "");
    let element3 = document.getElementById('email');
    element3!.className = element3!.className.replace(" error_border", "");
    let element4 = document.getElementById('phone');
    element4!.className = element4!.className.replace(" error_border", "");
    let element5 = document.getElementById('food');
    element5!.className = element5!.className.replace(" error_border", "");
  }

  private emptyFields(): boolean {
    let error = false;
    if (this.rsvpForm.controls['partyName'].value == null || this.rsvpForm.controls['partyName'].value == '') {
      this.errorMessage = '**Invalid information, check the highlighted fields and try again.';
      let element2 = document.getElementById('name');
      element2!.className += " error_border";
      error = true;
    } else {
      let element2 = document.getElementById('name');
      element2!.className = element2!.className.replace(" error_border", "");
    }
    if (this.rsvpForm.controls['partyEmail'].value == null || this.rsvpForm.controls['partyEmail'].value == '') {
      this.errorMessage = '**Invalid information, check the highlighted fields and try again.';
      let element2 = document.getElementById('email');
      element2!.className += " error_border";
      error = true;
    } else {
      let element2 = document.getElementById('email');
      element2!.className = element2!.className.replace(" error_border", "");
    }

    if (this.rsvpForm.controls['dietaryRestrictions'].value == null || this.rsvpForm.controls['dietaryRestrictions'].value == '') {
      this.errorMessage = '**Invalid information, check the highlighted fields and try again.';
      let element2 = document.getElementById('food');
      element2!.className += " error_border";
      error = true;
      console.log("test");
    } else {
      let element2 = document.getElementById('food');
      element2!.className = element2!.className.replace(" error_border", "");
    }

    if (error == false) {
      this.errorMessage = ''
      error = false;
    }

    return error;
  }
}
