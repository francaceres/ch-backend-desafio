import ticketModel from "../models/ticket.js";

export default class TicketMongoManager {
  constructor() {}

  createTicket = (ticket) => {
    return ticketModel.create(ticket);
  };

  getTicket = (code) => {
    return ticketModel.findOne({ code }).lean();
  };
}
