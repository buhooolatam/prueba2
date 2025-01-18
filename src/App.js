import React, { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
  try {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      throw new Error("El precio debe ser un número mayor a 0");
    }

    await addDoc(collection(db, "items"), {
      name,
      price: priceValue,
    });

    alert("Ítem añadido correctamente");
    setName("");
    setPrice("");
  } catch (error) {
    console.error("Error al guardar el ítem:", error.message);
  }
};

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gestor de Ítems</h1>
      <button onClick={() => setShowModal(true)}>Añadir Ítem</button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "1px solid #ccc",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <h2>Añadir Ítem</h2>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Nombre del Ítem:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Precio Unitario:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleSave} style={{ marginRight: "10px" }}>
            Guardar
          </button>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
