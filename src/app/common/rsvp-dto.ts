import { Party } from "./party";

export class RsvpDTO {

    constructor(
        private party: Party,
        private success: string
    ) {}

    public getParty(): Party {
        return this.party
    }

    public setParty(party: Party) {
        this.party = party;
    }

    public getSuccessBool(): string {
        return this.success;
    }

    public setSuccessBool(successBool: string) {
        this.success = successBool;
    }
}


