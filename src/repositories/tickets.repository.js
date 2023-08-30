export default class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = (code, purchase_datetime, amount, purchaser) => {
    return this.dao.createTicket(code, purchase_datetime, amount, purchaser);
  };
}
