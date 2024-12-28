import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import './DeleteTransaction.css';
import '../index.css';

const DeleteTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction(docSnap.data());
        } else {
          alert("No such transaction exists!");
          navigate("/transactions");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "transactions", id);
      await deleteDoc(docRef);
      alert("Transaction deleted successfully!");
      navigate("/transactions");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (!transaction) return <p id="loading-message">Loading transaction details...</p>;

  return (
    <div className="delete-transaction-container">
      <h2 className="page-title">Delete Transaction</h2>
      <div className="transaction-details">
        <p className="transaction-detail"><strong>Description:</strong> {transaction.description}</p>
        <p className="transaction-detail"><strong>Amount:</strong> {transaction.amount}</p>
        <p className="transaction-detail"><strong>Date:</strong> {transaction.date}</p>
        <p className="transaction-detail"><strong>Type:</strong> {transaction.type}</p>
      </div>
      <div className="action-buttons">
        <button className="delete-button" onClick={handleDelete}>Delete Transaction</button>
        <button className="cancel-button" onClick={() => navigate("/transactions")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTransaction;
