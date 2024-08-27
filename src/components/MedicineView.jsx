import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function MedicineView() {
  let params = useParams();
  const medicines = useSelector((state) => state.medicines.medicines);
  console.log(medicines);
  const [medicine, setMedicine] = useState({});
  useEffect(() => {
    let foundMedicine = medicines.find((x) => x.id == params.id);
    setMedicine(foundMedicine);
  }, [medicine]);

  return (
    <div>
      <div className="px-5 ps-2 py-3">
        <Link to={"/add"}>
          <img
            title="Back"
            style={{ width: "35px" }}
            src="https://th.bing.com/th/id/R.f14fe1c83e628673e61417534b8b48c9?rik=i3yKTPy2kfVQXg&riu=http%3a%2f%2fwww.downloadclipart.net%2flarge%2f19185-back-button-design.png&ehk=nxAjQHTXzOven7u37LnYMWed99yqYGZrtnbefCe6zgM%3d&risl=&pid=ImgRaw&r=0"
            alt="back"
          />
        </Link>
      </div>

      <div className="card mb-4 shadow-sm rounded-3 w-50 mx-auto">
        <div className="card-body p-4">
          <h5 className="card-title text-primary fw-bold text-center py-3 border-bottom">
            {medicine.medicineName}
          </h5>
          <p className="card-text">
            Stock Available : {medicine.stock}
          </p>
          <p className="card-text">
            Date Added : {medicine.date}
          </p>
          <p className="card-text">
            Added Time : {medicine.time}
          </p>
          <p className="card-text">
            Added by : {medicine.email}
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default MedicineView;
