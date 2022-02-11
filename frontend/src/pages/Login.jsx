import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './../features/auth/auth-slice'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const dispatch = useDispatch()
  const {user, loading, isSuccess, message} = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      email: formData.email,
      password: formData.password
    }

    dispatch(login(userData))
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p> Please login to get support </p>
      </section>

      <section className="form">
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <button className="btn-block btn">submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
