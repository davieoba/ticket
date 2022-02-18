import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import the async code for auth
import {
  register,
  reset,
  getRegisteredUser,
} from "./../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("registered successfully");
      navigate("/");
    }

    dispatch(reset());
  }, [message, isSuccess]);

  function handleChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm)
      return toast.error("passwords do not match");

    const userData = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };

    dispatch(register(userData));
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p> create an account </p>
      </section>

      <section className="form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter your name"
              id="name"
              required
            />

            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              id="email"
              required
            />

            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter password"
              id="password"
              required
            />

            <input
              type="password"
              name="passwordConfirm"
              className="form-control"
              onChange={handleChange}
              value={formData.passwordConfirm}
              placeholder="confirm password"
              id="password2"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn-block btn">submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
