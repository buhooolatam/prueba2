import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDX-vvxS67Cayv6WSEb2r2QLa5SOkGStbU",
  authDomain: "votacion-7355d.firebaseapp.com",
  projectId: "votacion-7355d",
  storageBucket: "votacion-7355d.appspot.com",
  messagingSenderId: "1077960152588",
  appId: "1:1077960152588:web:dc8d934d55748fdc7f0029",
  measurementId: "G-ZPQ9FXFZ12",
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    console.log("Intentando guardar ítem:", { name, price });

    try {
      // Convertir el precio a número
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
      }

      // Guardar el documento en Firestore
      const docRef = await addDoc(collection(db, "items"), {
        name,
        price: priceValue,
      });
      console.log("Ítem añadido correctamente con ID:", docRef.id);
      alert("Ítem añadido correctamente");
      setShowModal(false);
      setName("");
      setPrice("");
      setError("");
    } catch (error) {
      console.error("Error al guardar el ítem:", error.message, error);
      setError(`Error al guardar el ítem: ${error.message}`);
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
};

export default App;
