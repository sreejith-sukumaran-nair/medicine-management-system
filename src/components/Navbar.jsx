import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const userFromlocalStorage = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img style={{height:"40px"}} src="https://pcd-pharmafranchise.co.in/wp-content/uploads/2018/08/cian-logo.png" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           

            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      ((status) => (status.isActive ? "active" : ""))
                    }
                    to="/login"
                  >
                    login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      ((status) => (status.isActive ? "active" : ""))
                    }
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className={
                  "nav-link " + ((status) => (status.isActive ? "active" : ""))
                }
                to="/about"
              >
                Who we are ?
              </Link>
            </li>
             {user && (
              <>

              
               
                <li className="nav-item">
                  <Link
                    to={"/add"}
                    className={
                      "nav-link " +
                      ((status) => (status.isActive ? "active" : ""))
                    }
                  >
                    Add medicine
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    
                    className={
                      "nav-link ms-4 me-0 pe-0" 
                      
                    }
                  >
                   Hai{" "} {userFromlocalStorage
                ? userFromlocalStorage.email.split("@")[0]
                : "user"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    to={"/"}
                    className={
                      "nav-link " +
                      ((status) => (status.isActive ? "active" : ""))
                    }
                  >
                    <img title="Logout" className="mb-1" style={{width:"20px"}} src="https://i.kisscc0.com/20180817/tue/kisscc0-computer-icons-login-abmeldung-button-symbol-primary-tool-shutdown-5b770bf07a28d3.8095272615345284965004.png" alt="logout" />
                  </Link>
                </li>
              </>
            )}

            
          </ul>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
