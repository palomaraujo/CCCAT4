import Coupon from "./Coupon";
import Cpf from "./Cpf";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
	cpf: Cpf;
	private orderItens: OrderItem[];
	coupon: Coupon | undefined;
	private freight: number;
	private  code: OrderCode;

    constructor (cpf:string, readonly date: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(), readonly sequence: number = 1){
        this.cpf = new Cpf(cpf); 
				this.orderItens = [];
				this.freight = 0;
				this.code = new OrderCode(date,sequence);
    }

	addItem(item:Item, quantity: number){
		this.freight += this.freightCalculator.calculate(item) * quantity ;
		this.orderItens.push(new OrderItem(item.idItem, item.price, quantity));
	}

	addCoupon(coupon: Coupon){
		if(coupon.isValid(this.date)){
			this.coupon = coupon;
		}
		return;
	}

	getFreight() {
		return this.freight;
	}

	getCode(){
		 return this.code.value;
	}

	getCpf(){
		return this.cpf.value;
	}

	getOrderItems(){
		return this.orderItens;
	}

	getTotal (){
		let total = 0;
		for (const orderItem of this.orderItens){
			total += orderItem.getTotal();
		}
		if(this.coupon){
			total -= this.coupon.calculateDiscount(total, this.date);
		}
		total += this.getFreight();
		return total;
	}
}