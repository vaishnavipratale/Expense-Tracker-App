import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

function Expense() {
    const [expensesData,setExpensesData] =useState([]);
    
    return (
        <>
            <section>
                <ExpenseForm expensesData={expensesData}  setExpensesData={setExpensesData} />
            </section>
        </>
    );
}

export default Expense;