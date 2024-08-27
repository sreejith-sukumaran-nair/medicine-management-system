import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [passwordError,setPasswordError] = useState(false)
  const [exist,setExist] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true)
    }
    else if(password == ""){
      setPasswordError(true)
    } else {
      const user = { email, password };
      let existingUser = localStorage.getItem(email);
      if (existingUser) {
        setExist(true)
      } else {
        localStorage.setItem(email, JSON.stringify(user));
        alert("Congrats...User registered successfully");
        navigate("/login");
      }
    }
  };
  return (
    <>
      <div className="">
        <div className="container-fluid">
          <div className="row min-vh-90 mt-5">
            <div className="col-sm-8 col-md-8 col-lg-6 col-xl-6 mx-auto my-auto">
            {passwordError && (
              <div
                className="mt-3 alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Please enter your password & confirm it correctly...
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setPasswordError(false)}
                ></button>
              </div>
            )}
            {exist && (
              <div
                className="mt-3 alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                User already exists...please try with another email...
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setExist(false)}
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
                      Register Now
                    </h3>
                    <p className="mt-0 pt-0 pb-0 mb-3 text-secondary fw-lighter">
                      Please fill this form to create an account !
                    </p>

                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control bg-light ps-3 border-0 placeholder-wave "
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
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control bg-light ps-3 border-0 placeholder-wave"
                        placeholder="Confirm Password"
                        id="exampleInputPassword1"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        class="btn btn-outline-primary w-100 fw-semibold mt-3"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <p className="text-center mt-3 fw-lighter">
                Already have an account?
                <Link className="text-decoration-none ms-2 fw-lighter" to="/login">
                  Login here
                </Link>
              </p>
              {passwordError && (
              <div
                className="mt-3 alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Please confirm your password correct...
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setPasswordError(false)}
                ></button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
