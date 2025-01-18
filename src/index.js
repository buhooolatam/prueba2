import React, { useState } from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Configuración
const firebaseConfig = {
  apiKey: "AIzaSyDX-vvxS67Cayv6WSEb2r2QLa5SOkGStbU",
  authDomain: "votacion-7355d.firebaseapp.com",
  projectId: "votacion-7355d",
  storageBucket: "votacion-7355d.appspot.com",
  messagingSenderId: "1077960152588",
  appId: "1:1077960152588:web:dc8d934d55748fdc7f0029",
  measurementId: "G-ZPQ9FXFZ12",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Componente Principal
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleAddItem = async () => {
    if (!itemName || !itemPrice) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const newItem = {
        name: itemName,
        price: parseFloat(itemPrice),
        createdAt: new Date(),
      };

      await addDoc(collection(db, "items"), newItem);
      setMessage("Ítem añadido correctamente.");
      setItemName("");
      setItemPrice("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al añadir el ítem:", error);
      setMessage("Error al añadir el ítem. Intenta nuevamente.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gestor de Ítems</h1>
      <button onClick={() => setIsModalOpen(true)}>Añadir Ítem</button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <h2>Añadir Ítem</h2>
          <input
            type="text"
            placeholder="Nombre del ítem"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
          <input
            type="number"
            placeholder="Precio del ítem"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
          <button onClick={handleAddItem} style={{ marginRight: "10px" }}>
            Guardar
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      )}

      {message && <p style={{ color: "red", marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

// Renderizar el componente
ReactDOM.render(<App />, document.getElementById("root"));
