import './EditTransaction.css';
import '../index.css';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditTransaction = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    date: "",
    type: "expense",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "transactions", id);
      await updateDoc(docRef, transaction);
      alert("Transaction updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="edit-transaction-container">
      <h2 className="form-title">Edit Transaction</h2>
      <form className="edit-transaction-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Amount:
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Description:
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Type:
          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <button type="submit" className="form-submit-button">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
