import { SelectedofferJoinOffer } from './SelectedofferJoinOffer';

export class ArraySelectedOffers {
    array: Array<SelectedofferJoinOffer> = new Array<SelectedofferJoinOffer>();

    add(selected: SelectedofferJoinOffer) {
        this.array.push(selected);
    }

    get(index: number) {
        let toreturn = '';
        let total = 0;
        for (let i = 0; i < this.array.length; i++) {
            total += this.array[i].price * this.array[i].amount;
            toreturn += '<div style="font-weight: bold; font-size: 1.1rem;">' + this.array[i].restaurantname + '</div>';
            toreturn += '<div style="color: #007bff; font-size: 1.2rem;"><a>'
             + this.array[i].amount + ' x ' + this.array[i].name + '</a></div>';
            toreturn += '<div>' + this.array[i].description + '</div>';
            toreturn += '<div>' + '( ' + this.array[i].getSelectedsidedishes() + ' )' + '</div>';
            toreturn += '<br>';
        }
        const totalstring = '<div class="total-price"> Total Price : ' + Math.round(total) + ' KM </div>';
    document.getElementById(String(index)).innerHTML = toreturn + totalstring;
    }

}

