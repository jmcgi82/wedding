import { Injectable } from '@angular/core';
import { RsvpDTO } from '../common/rsvp-dto';
import { Party } from '../common/party';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  party: RsvpDTO = new RsvpDTO(new Party(1, '', 1, '', '', ''), "true")

  constructor() { }

  // private data
  private data: BehaviorSubject<RsvpDTO> = new BehaviorSubject<RsvpDTO>(this.party);

  // public observable
  public purchaseServiceData: Observable<RsvpDTO> = this.data.asObservable();

  public setData(dataIn: RsvpDTO) {
    this.data.next(dataIn);
  }

  public getData() {
    return this.purchaseServiceData;
  }

  public setParty(party: Party) {
    this.party = new RsvpDTO(party, "true")

  }

}
