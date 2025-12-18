import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5001/api/equipment";

function EquipmentForm({ loadData, selected, setSelected }) {
  const [form, setForm] = useState({
    name: "",
    type: "Machine",
    status: "Active",
    last_cleaned: ""
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      await fetch(`${API_URL}/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({
      name: "",
      type: "Machine",
      status: "Active",
      last_cleaned: ""
    });

    setSelected(null);
    loadData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <input
          name="name"
          placeholder="Equipment Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option>Machine</option>
          <option>Vessel</option>
          <option>Tank</option>
          <option>Mixer</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Maintenance</option>
        </select>

        <input
          type="date"
          name="last_cleaned"
          value={form.last_cleaned}
          onChange={handleChange}
        />
      </div>

      <br />

      <button className="btn btn-primary" type="submit">
        {selected ? "Update Equipment" : "Add Equipment"}
      </button>
    </form>
  );
}

export default EquipmentForm;
