import React from "react";

function EquipmentList({ data, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8" }}>
                No equipment added yet
              </td>
            </tr>
          ) : (
            data.map(eq => (
              <tr key={eq.id}>
                <td>{eq.name}</td>
                <td>{eq.type}</td>
                <td>
                  <span
                    className={`badge ${
                      eq.status === "Active"
                        ? "active"
                        : eq.status === "Inactive"
                        ? "inactive"
                        : "maintenance"
                    }`}
                  >
                    {eq.status}
                  </span>
                </td>
                <td>{eq.last_cleaned}</td>
                <td className="actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEdit(eq)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(eq.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentList;
