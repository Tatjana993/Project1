import { Offer } from '../offer/offer.model';

export class SelectedofferJoinOffer {
    idSelectedoffer: number;
    name: string;
    amount: number;
    description: string;
    idOffer: number;
    instruction: string;
    price: number;
    restaurantname: string;
    selectedsidedishes: Array<String> = new Array<String>();

    constructor(idSelectedoffer: number, name: string, amount: number, description: string, idOffer: number,
         instruction: string, price: number, restaurantname: string, selectedsidedishes: Array<String>) {
        this.idSelectedoffer = idSelectedoffer;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.idOffer = idOffer;
        this.instruction = instruction;
        this.price = price;
        this.restaurantname = restaurantname;
        this.selectedsidedishes = selectedsidedishes;
    }

    /*idUser: number;
    idOrder: number;
    datetime: string;
    instruction: string;
    idrestauran: number;
    description: string;
    price: number;
    image: Array<Offer>; */
}
