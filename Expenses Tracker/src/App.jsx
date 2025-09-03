import { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux"; 
import { addTransaction, deleteTransaction, editTransaction } from "./reducer"; 
import "./App.css";

function App() {

  const transactions = useSelector((state) => state.transactions); const dispatch = useDispatch();
  const [form, setForm] = useState({ id: null, title: "", amount: "", type: "Income", category: "Food", date: "", });
  const income = transactions.filter((t) => t.type === "Income").reduce((acc, cur) => acc + Number(cur.amount), 0); const expense = transactions.filter((t) => t.type === "Expense").reduce((acc, cur) => acc + Number(cur.amount), 0); const balance = income - expense;
  const handleSubmit = (e) => {
    e.preventDefault(); const amt = Math.abs(Number(form.amount)); if (!form.title || !amt || !form.date) return;
    const payload = { ...form, amount: amt };

    if (form.id) {
      dispatch(editTransaction(payload));
    } else {
      dispatch(addTransaction({ ...payload, id: Date.now() }));
    }
    setForm({ id: null, title: "", amount: "", type: "Income", category: "Food", date: "" });
  };

  const handleEdit = (t) => { setForm({ ...t }); };

  return (<div className="app"> <h1>💰 Expense Tracker</h1>

    <div className="summary">
      <div className="card">
        <h2>Balance</h2>
        <p className="blue">₹ {balance}</p>
      </div>
      <div className="card">
        <h2>Income</h2>
        <p className="green">₹ {income}</p>
      </div>
      <div className="card">
        <h2>Expenses</h2>
        <p className="red">₹ {expense}</p>
      </div>
    </div>

    <div className="form-box">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>
    </div>

    <div className="list-box">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            <div>
              <p className="title">{t.title}</p>
              <p className="info">{t.category} • {t.date}</p>
            </div>
            <div className="actions">
              <p className={t.type === "Income" ? "green" : "red"}>
                {t.type === "Income" ? "+" : "-"} ₹{t.amount}
              </p>
              <button onClick={() => handleEdit(t)}>🖊️</button>
              <button onClick={() => dispatch(deleteTransaction(t.id))}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

  );
}

export default App;
