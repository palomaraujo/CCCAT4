import Connection from "./Connection";
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
  pgp:any;
  constructor(){
    this.pgp = pgp()("postgress://palomaraujo:admin@localhost:5432/postgres");
  }

  query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }

}