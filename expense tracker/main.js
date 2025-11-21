const balanceEl=document.getElementById("balance");
const incomeAmountEl =document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl=document.getElementById("description");
const amountEl =document.getElementById("amount");

// to store the previous data and not gone when you refresh the page or things like this 
// if we don't have any thing make a new array else go and get these items
// json.parse to get the structure data instead of a string  
let transactions= JSON.parse(localStorage.getItem("transactions")) || [];

// now to update this to when we add or delete something from our transactions array 
// 1- when we submit new transaction 
transactionFormEl.addEventListener("submit" , addtransaction);
function addtransaction(e){
    // to not refresh the page every time you submit new thing to it 
    e.preventDefault();

    //form values 
    // value here is not a method it's a property
    // trim function is to remove any spaces at the start or end to string 
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        // so when you add new thing it will go to the top of the tasks not in the end 
        id:Date.now(),
        description,
        amount
    })

    // now we need to save it to the local storage as well 
    localStorage.setItem("transactions",JSON.stringify(transactions));

    // now after we save the transaction we need to update the ui 
    updateTransactionList();
    updateSummary();
    transactionFormEl.reset();
}

function updateTransactionList(){
    // we will begin by reset it in the moment then we will add what we want to add
    transactionListEl.innerHTML="";

    // ...transactions mean =>> get every thing in the transactions 
    const sortedTransactions=[...transactions].reverse();
    sortedTransactions.forEach((transaction) =>{
        // another method we will do to pass the values to it 
        const transactionEl=createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction){
    // this is the data that will be passed to the ul tag in html that we left it as a blank to get the data from the js functionallity 
    const li = document.createElement("li");
    li.classList.add("transaction");
    // now to handle the income and expense we will do the following 
    li.classList.add(transaction.amount>0 ? "income" :"expense");

    //todo: update the amount formatting
    li.innerHTML=`
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
    `;
    return li;
}

function updateSummary(){
    // it will make with your amount like it is a calculator 
    // reduce has a job to make the array into one value by repeating the transaction for every item in the array 
    // if you pass to it some : 100, -50,200,-200 => it will do the following : 0 + 100 + -50 + 200 + -200 = 50
    // acc == accumulator the current sum of the numbers 
    // transaction => the current item in the list  
    // acc+transaction.amount -> append the current value to the acc
    const balance = transactions
    .reduce((acc,transaction)=>acc+transaction.amount,0);

    const income = transactions
    .filter((transaction)=> transaction.amount>0)
    .reduce((acc,transaction)=> acc+transaction.amount,0);

    const expenses =transactions
    .filter((transaction)=> transaction.amount<0)
    .reduce((acc,transaction)=> acc+transaction.amount,0);

    // update ui 
    balanceEl.textContent=formatCurrency(balance);
    incomeAmountEl.textContent=formatCurrency(income) ;
    expenseAmountEl.textContent =formatCurrency(expenses);
}

function formatCurrency(number){
    return new Intl.NumberFormat("en-us",{
        style:"currency",
        currency:"USD"
    }).format(number);
}

function removeTransaction(id){
    //filter out the one we wanted to delete  
    transactions = transactions.filter((transaction) => transaction.id !== id);
    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

//initial render 
updateTransactionList();
updateSummary();
// to solve the problem of the removing the element after refreshing and show them after adding new item again 