export class SelectedOffer {
    idoffer: number;
    iduser: number;
    amount: number;
    idorder: number;
    sidedishes: number[];
    instruction: string;

    constructor(idoffer: number, iduser: number, amount: number, sidedishes: number[], instruction: string) {
        this.idoffer = idoffer;
        this.iduser = iduser;
        this.amount = amount;
        this.sidedishes = sidedishes;
        this.instruction = instruction;
    }

    set order(idorder: number) {
        this.idorder = idorder;
    }

    set setAmount(amount: number) {
        this.amount = amount;
    }
}
