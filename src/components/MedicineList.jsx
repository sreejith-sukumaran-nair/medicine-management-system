import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MedicineList() {
  const [search,setSearch] = useState('');
  const [medicineIntakeEntries, setMedicineIntakeEntries] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [filteredEntries, setFilteredEntries] = useState([]);
  
  useEffect(() => {
    const allEntries =
      JSON.parse(localStorage.getItem("medicineIntakeData")) || [];
    const userEntries = allEntries.filter(
      (entry) => entry.email === user.email
    );
    setMedicineIntakeEntries(userEntries);
    setFilteredEntries(userEntries);
  }, [user.email]);

  console.log(medicineIntakeEntries)

  useEffect(() => {
    const searchedArray = medicineIntakeEntries.filter((intake) =>
      intake.medicineName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEntries(searchedArray);
  }, [search, medicineIntakeEntries]);

  

  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <div className="container mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Stock</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.medicineName}</td>
                <td>{medicine.stock}</td>
                <td>{medicine.date}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(medicine)}
                  >
                    Edit
                  </button>
                  
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(medicine)}
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MedicineList;
