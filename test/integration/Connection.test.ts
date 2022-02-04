import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";

test("Deve criar uma conexão com o banco de dados", async function(){
  const connection = new PgPromiseConnectionAdapter();
  const itemsData = await connection.query("select * from public.item", []);
  expect(itemsData).toHaveLength(6);
})