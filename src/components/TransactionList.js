import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./TransactionList.css";
import '../index.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsRef = collection(db, "transactions");
        const querySnapshot = await getDocs(transactionsRef);
        const transactionList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionList);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };

  return (
    <div className="transaction-list-container">
      <h1 className="page-title">Transaction List</h1>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <p>
                <span className="transaction-label">Description:</span>{" "}
                {transaction.description}
              </p>
              <p>
                <span className="transaction-label">Amount:</span>{" "}
                {transaction.amount}
              </p>
              <p>
                <span className="transaction-label">Date:</span>{" "}
                {transaction.date}
              </p>
              <p>
                <span className="transaction-label">Type:</span>{" "}
                {transaction.type}
              </p>
            </div>
            <div className="transaction-actions">
              <button
                className="edit-button"
                onClick={() => handleEdit(transaction.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(transaction.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
