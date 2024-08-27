import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../store/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors,setErrors] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
      dispatch(login({ email }));
      navigate('/add')
    } else {
      setErrors(true)
    }
  };
  return (
    <>
      <div className="">
        <div className="container-fluid">
          <div className="row min-vh-90 mt-5">
            <div className="col-sm-8 col-md-8 col-lg-6 col-xl-6 mx-auto my-auto">
            {errors && (
              <div
                className="mt-3 alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                invalid Credentials...
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setErrors(false)}
                ></button>
              </div>
            )}
              <div className="card shadow-sm">
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit}
                    className="form mx-auto py-3 px-3"
                  >
                    <h3 className="mb-2 pb-0 text-secondary mb-3 fw-lighter">
                      Login
                    </h3>
                    <p className="mt-0 pt-0 pb-0 mb-3 text-secondary fw-lighter">
                      Please fill this form to sign in !
                    </p>

                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control bg-light ps-3 border-0 placeholder-wave"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control bg-light ps-3 border-0 placeholder-wave"
                        placeholder="Password"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-outline-primary w-100 fw-semibold mt-3"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <p className="text-center mt-3 fw-lighter">
                Don't have an account?
                <Link className="text-decoration-none ms-2 fw-lighter" to="/register">
                  Register Now
                </Link>
              </p>
             
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
