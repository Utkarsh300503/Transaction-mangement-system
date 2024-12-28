import '../index.css';
import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AddTransactionForm.css";


const AddTransactionForm = () => {
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    date: "",
    type: "expense",
  });

  const navigate = useNavigate();

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
      const formattedTransaction = {
        ...transaction,
        date: transaction.date, // Save the date as a string
      };
      await addDoc(collection(db, "transactions"), formattedTransaction);
      alert("Transaction added successfully!");
      navigate("/transactions");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleShowTransactions = () => {
    navigate("/transactions");
  };

  return (
    <div className="add-transaction-container">
      <form className="add-transaction-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Transaction</h2>
        <label htmlFor="amount">
          Amount:
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="type">
          Type:
          <select
            id="type"
            name="type"
            value={transaction.type}
            onChange={handleChange}
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
      <div className="button-wrapper">
        <button
          type="button"
          className="show-transactions-button"
          onClick={handleShowTransactions}
        >
          Show Transactions
        </button>
      </div>
    </div>
  );
};

export default AddTransactionForm;

