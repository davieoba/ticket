import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import { createTicket, reset } from "./../features/ticket/ticketSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../components/Spinner";

function NewTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const ticketState = useSelector((state) => state.ticket);

  const { loading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const name = user.result.user.name;
  const email = user.result.user.email;

  const [formData, setFormData] = useState({
    product: "iPhone",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // normally a state update would cause a component to re render itself but beacuse this is not my state in this component that is why I am using useEffect hook to watch for changes to this variables
  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/new-ticket");
    }

    if (isSuccess) {
      dispatch(reset());
      // @ navigate to the list of all my tickets
      navigate("/tickets");
    }
  }, [isError, message, isSuccess, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTicket(formData));
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={formData.product}
              onChange={handleChange}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
