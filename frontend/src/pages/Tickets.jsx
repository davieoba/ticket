import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset, success } from "./../features/ticket/ticketSlice";
import BackButton from "./../components/BackButton";
import { Link } from "react-router-dom";

function Ticket() {
	const { loading, isSuccess, isError, tickets, finished } = useSelector(
		(state) => state.ticket
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets());

		// console.log("this code is runnign");
		if (tickets.message === "success") {
			// console.log("I am here o");
			dispatch(reset());
		}

		dispatch(reset());

		// dispatch(success());
	}, [tickets.message]);

	// useEffect(() => {
	// 	return () => {
	// 		if (isSuccess) {
	// 			dispatch(reset());
	// 		}
	// 		console.log(isSuccess);
	// 	};
	// }, [isSuccess]);

	// console.log(tickets);
	const dataElements =
		tickets?.message === "success" &&
		tickets.data.ticket.map((ticket) => {
			return (
				<div className="ticket" key={ticket._id}>
					<div>
						{new Date(ticket?.createdAt).toLocaleString("en-US")}
					</div>
					<div>{ticket.product}</div>
					<div className={`status status-${ticket.status}`}>
						{ticket.status}
					</div>
					<Link
						to={`/ticket/${ticket._id}`}
						className="btn btn-reverse btn-sm"
					>
						View
					</Link>
				</div>
			);
		});

	return (
		<>
			<BackButton url="/" />
			<h1>Tickets</h1>
			<div className="tickets">
				<div className="ticket-headings">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{dataElements}
			</div>
		</>
	);
}

export default Ticket;
