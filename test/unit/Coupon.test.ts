import Coupon from "../../src/domain/entity/Coupon"

test("Deve criar um cupom de desconto válido", function(){
    const coupon = new Coupon("VALE20", 20, new Date("2021-12-10"));
    const today = new Date("2021-12-01")
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
})

test("Deve criar um cupom de desconto expirado", function(){
    const coupon = new Coupon("VALE20", 20, new Date("2021-03-01"));
    const today = new Date("2021-12-01");
    const isExpired = coupon.isExpired();
    expect(isExpired).toBeTruthy();
})

test("Deve criar um cupom de desconto válido e calcular o desconto", function(){
    const coupon = new Coupon("VALE20", 20);
    const today = new Date("2021-12-01")
    const amount = coupon.calculateDiscount(1000)
    expect(amount).toBe(200);
})