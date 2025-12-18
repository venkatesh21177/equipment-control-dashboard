import React, { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentList from "./components/EquipmentList";
import "./App.css";

const API_URL = "http://localhost:5001/api/equipment";

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await fetch(API_URL);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteEquipment = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <>
      <div className="header">
        <h1>Equipment Control Dashboard</h1>
      </div>

      <div className="dashboard">
        <div className="panel">
          <div className="form-title">
            {selected ? "Edit Equipment" : "Add New Equipment"}
          </div>

          <EquipmentForm
            loadData={loadData}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div className="panel">
          <EquipmentList
            data={data}
            onEdit={setSelected}
            onDelete={deleteEquipment}
          />
        </div>
      </div>
    </>
  );
}

export default App;
