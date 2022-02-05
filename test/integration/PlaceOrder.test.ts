import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

let placeOrder: PlaceOrder; 
let orderRepository: OrderRepositoryDatabase;

beforeEach(function () {
    const connection = new PgPromiseConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryDatabase(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository );
});

test("Deve fazer um pedido", async function(){
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        date: new Date("2021-12-10"),
        coupon:"VALE20"
    }
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(138);
})

test("Deve fazer um pedido com calculo de frete", async function(){
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1},
            { idItem: 5, quantity: 1},
            { idItem: 6, quantity: 3}
        ],
        date: new Date("2021-12-10"),
    }
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
})

test("Deve fazer um pedido com código'", async function(){
    const input = {
        cpf: "839.435.452-10",
        orderItems: [
            { idItem: 4, quantity: 1},
            { idItem: 5, quantity: 1},
            { idItem: 6, quantity: 3}
        ],
        date: new Date("2021-12-10"),
    }
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202100000001");
})

afterEach(async function (){
    await orderRepository.clear()
})