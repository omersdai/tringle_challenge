const [TRY, USD, EUR] = ["TRY", "USD", "EUR"];
const [INDIVIDUAL, CORPORATE] = ["individual", "corporate"];
const [PAYMENT, DEPOSIT, WITHDRAW] = ["payment", "deposit", "withdraw"];

const currencyCodes = [TRY, USD, EUR];
const accountTypes = [INDIVIDUAL, CORPORATE];

const accounts = {};

export const createAccount = (account) => {
  const { accountNumber, currencyCode, ownerName, accountType } = account;

  if (!accountNumber || !currencyCode || !ownerName || !accountType)
    throw Error("Wrong format");

  if (!currencyCodes.includes(currencyCode))
    throw Error("Currency code does not exist");
  if (!accountTypes.includes(accountType))
    throw Error("Account type does not exist");

  if (accounts[accountNumber]) throw Error("Account number already taken");

  account.balance = 0;
  account.transactionHistory = [];
  accounts[accountNumber] = account;
};

export const getAccount = (accountNumber) => {
  const account = accounts[accountNumber];

  if (!account) throw new Error("Account doesn't exist");

  return account;
};

export const handlePayment = (
  senderAccountNumber,
  receiverAccountNumber,
  amount
) => {
  const senderAccount = accounts[senderAccountNumber];
  const receiverAccount = accounts[receiverAccountNumber];

  if (!senderAccount || !receiverAccount)
    throw new Error("Account doesn't exist");

  if (senderAccount.accountType !== INDIVIDUAL || receiverAccount !== CORPORATE)
    throw new Error("Account type is not valid");

  if (senderAccount.currencyCode !== receiverAccount.currencyCode)
    throw new Error("Currencies do not match!");

  if (amount <= 0) throw new Error("Amount should be greater than zero");

  if (senderAccount.balance < amount)
    throw new Error("Sender has insufficient funds!");

  senderAccount.balance -= amount;
  receiverAccount.balance += amount;

  senderAccount.transactionHistory.push({
    accountNumber: receiverAccountNumber,
    amount: amount,
    transactionType: PAYMENT,
    createdAt: new Date(Date.now()).toDateString(),
  });

  receiverAccount.transactionHistory.push({
    accountNumber: senderAccountNumber,
    amount: amount,
    transactionType: PAYMENT,
    createdAt: new Date(Date.now()).toDateString(),
  });
};

export const handleDeposit = (accountNumber, amount) => {
  const account = accounts[accountNumber];

  if (!account) throw new Error("Account doesn't exist");

  if (amount <= 0) throw new Error("Amount should be greater than zero");

  if (account.accountType !== INDIVIDUAL)
    throw new Error("Account type is not valid");

  account.balance += amount;

  account.transactionHistory.push({
    accountNumber: accountNumber,
    amount: amount,
    transactionType: DEPOSIT,
    createdAt: new Date(Date.now()).toDateString(),
  });
};

export const handleWithdraw = (accountNumber, amount) => {
  const account = accounts[accountNumber];

  if (!account) throw new Error("Account doesn't exist");

  if (amount <= 0) throw new Error("Amount should be greater than zero");

  if (account.accountType !== INDIVIDUAL)
    throw new Error("Account type is not valid");

  if (account.balance < amount)
    throw new Error("Account has insufficient funds!");

  account.balance -= amount;

  account.transactionHistory.push({
    accountNumber: accountNumber,
    amount: amount,
    transactionType: WITHDRAW,
    createdAt: new Date(Date.now()).toDateString(),
  });
};

export const getTransactionHistory = (accountNumber) => {
  const account = accounts[accountNumber];

  if (!account) throw new Error("Account doesn't exist");

  return account.transactionHistory;
};
