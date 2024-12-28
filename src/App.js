import './App.css';
import { Routes, Route } from "react-router-dom";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import EditTransaction from "./components/EditTransaction";
import DeleteTransaction from "./components/DeleteTransaction";

function App() {
  return (
    <div  >
      <h1 className="main-heading">Transaction management System</h1>
      <Routes>
        <Route path="/" element={ <AddTransactionForm />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/delete/:id" element={<DeleteTransaction />} />
      </Routes>
    </div>
  );
};


export default App;
