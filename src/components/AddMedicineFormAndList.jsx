import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addMedicine,
  editMedicine,
  deleteMedicine,
} from "../store/medicinesSlice";

function AddMedicineFormAndList() {
  const [medicineName, setMedicineName] = useState("");
  const [stock, setStock] = useState("");
  const [search, setSearch] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [editingMedicineName, setEditingMedicineName] = useState("");
  const [editingStock, setEditingStock] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines.medicines);

  const userFromlocalStorage = JSON.parse(localStorage.getItem("user"));
  const user = userFromlocalStorage.email;

  //pagination starts....................
  
  const itemsPerPage = 2;
  const filteredEntries = medicines.filter(
    (medicine) =>
      medicine.medicineName.toLowerCase().includes(search.toLowerCase()) &&
      medicine.email === user
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  //pagination ends....................

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

    if (user && medicines.filter((m) => m.email === user).length <= 4) {
      dispatch(
        addMedicine({
          email: user,
          medicineName,
          stock,
          date,
          time,
        })
      );
      setMedicineName("");
      setStock("");
    } else {
      setAlertVisible(true);
      setMedicineName("");
      setStock("");
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setEditingMedicineName(medicine.medicineName);
    setEditingStock(medicine.stock);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingMedicine) {
      dispatch(
        editMedicine({
          id: editingMedicine.id,
          updatedData: {
            medicineName: editingMedicineName,
            stock: editingStock,
          },
        })
      );
      setEditingMedicine(null);
      setEditingMedicineName("");
      setEditingStock("");
    }
  };

  const handleDelete = (medicine) => {
    dispatch(deleteMedicine(medicine.id));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex">
          <div className="col-md-8 p-5 pt-3">
            <h4 className="mb-4 fw-light">
              Medicines added by{" "}
              {userFromlocalStorage
                ? userFromlocalStorage.email.split("@")[0]
                : "user"}
            </h4>
            <div className="container mt-4">
              <input
                className="form-control w-50 ms-auto mb-3"
                type="search"
                placeholder="Search medicine..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Stock</th>
                    <th>Date & time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length ? (
                    currentItems.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>{medicine.medicineName}</td>
                        <td>{medicine.stock}</td>
                        <td>
                          {medicine.date}{" "}
                          <span className="fs-6 fw-lighter mx-2">
                            <small>at</small>
                          </span>
                          {medicine.time}
                        </td>
                        <td>
                          <Link
                            className="btn btn-outline-info btn-sm me-2"
                            to={`/add/view/${medicine.id}`}
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-outline-warning btn-sm me-2"
                            onClick={() => handleEdit(medicine)}
                            data-bs-toggle="modal"
                            data-bs-target={`#e${medicine.id}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#d${medicine.id}`}
                          >
                            Delete
                          </button>
                          {/* Edit Modal */}
                          <div
                            className="modal fade"
                            id={`e${medicine.id}`}
                            tabIndex="-1"
                            aria-labelledby="editModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header text-info">
                                  <h5
                                    className="modal-title"
                                    id="editModalLabel"
                                  >
                                    Edit Medicine
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-success"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <form onSubmit={handleEditSubmit}>
                                  <div className="modal-body">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="editMedicineName"
                                        className="form-label"
                                      >
                                        Medicine Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="editMedicineName"
                                        value={editingMedicineName}
                                        onChange={(e) =>
                                          setEditingMedicineName(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="editStock"
                                        className="form-label"
                                      >
                                        Available Stock
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="editStock"
                                        value={editingStock}
                                        onChange={(e) =>
                                          setEditingStock(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer justify-content-end">
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="btn btn-outline-primary btn-sm"
                                      data-bs-dismiss="modal"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>

                          {/* Delete Modal */}
                          <div
                            className="modal fade"
                            id={`d${medicine.id}`}
                            tabIndex="-1"
                            aria-labelledby="deleteModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header text-danger">
                                  <h5
                                    className="modal-title"
                                    id="deleteModalLabel"
                                  >
                                    Are You Sure?
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-success"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <p className="lead fw-light">
                                    This action{" "}
                                    <strong>cannot be undone!</strong>
                                    <br />
                                    Do you really want to remove{" "}
                                    <strong>
                                      {medicine.medicineName}
                                    </strong>{" "}
                                    from your list?
                                  </p>
                                </div>
                                <div className="modal-footer justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-outline-success btn-sm"
                                    data-bs-dismiss="modal"
                                  >
                                    No, Keep It!
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(medicine)}
                                    data-bs-dismiss="modal"
                                  >
                                    Yes, Delete It!
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr colspan={4}>
                        <div className="">
                      <small className="text-center text-muted fw-ighter mt-5 pt-5 p-3">
                        🚫 No Medicines Available! Add Some to Your List Now!
                      </small>
                    </div>
                    </tr>
                    
                  )}
                </tbody>
              </table>
              <nav className="d-flex justify-content-end" aria-label="Page navigation">
                <ul className="pagination pagination-sm">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <span className="page-link">{index + 1}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-md-4 pe-5 pt-3 ">
            <h4 className="mb-4 fw-light">Add Medicine</h4>
            <form className="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="medicineName" className="form-label">
                  Medicine Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="medicineName"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Available Stock
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-outline-success w-100">
                  Add Medicine
                </button>
              </div>
            </form>
            {alertVisible && (
              <div
                className="mt-3 alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                You have exceeded your limit of 5 medicines.
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setAlertVisible(false)}
                ></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMedicineFormAndList;
