export default class TicketDTO {
  constructor(ticket) {
    (this.code = ticket.code),
      (this.purchase_datetime = ticket.datetime.toString()),
      (this.amount = ticket.amount),
      (this.purchaser = ticket.purchaser);
  }
}
