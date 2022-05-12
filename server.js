import express from "express";
import {
  createAccount,
  getAccount,
  handlePayment,
  handleDeposit,
  handleWithdraw,
  getTransactionHistory,
} from "./bank.js";

const app = express();

app.use(express.json()); //Used to parse JSON bodies

app.post("/account", (req, res) => {
  try {
    const { accountNumber, currencyCode, ownerName, accountType } = req.body;
    const account = { accountNumber, currencyCode, ownerName, accountType };
    createAccount(account);
    res.send(account);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

app.get("/account/:accountNumber", (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const account = getAccount(accountNumber);
    res.send(account);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

app.post("/payment", (req, res) => {
  try {
    const { senderAccount, receiverAccount, amount } = req.body;
    handlePayment(senderAccount, receiverAccount, amount);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

app.post("/deposit", (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    handleDeposit(accountNumber, amount);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

app.post("/withdraw", (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    handleWithdraw(accountNumber, amount);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

app.get("/accounting/:accountNumber", (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const transactionHistory = getTransactionHistory(accountNumber);
    res.send(transactionHistory);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

const PORT = 5050;

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
