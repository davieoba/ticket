// @ I want to get the data from the form and send it to my backend api
// @

const createTicket = async (ticketData, token) => {
  const response = await fetch("http://localhost:5000/api/v1/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

const getTickets = async (token) => {
  const response = await fetch(`http://localhost:5000/api/v1/tickets`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

export const ticketService = {
  createTicket,
  getTickets,
};
