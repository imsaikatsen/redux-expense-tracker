import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

//async thunks
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);
export const changeTransaction = createAsyncThunk(
  "transaction/changeTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);
export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

//create slice

const transactionSlice = createSlice({
  name: "transaction",
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.transactions = [];
    });
    //add
    builder.addCase(createTransaction.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.transactions.push(action.payload);
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });

    //change

    builder.addCase(changeTransaction.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(changeTransaction.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      const indexToUpdate = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      state.transactions[indexToUpdate] = action.payload;
    });
    builder.addCase(changeTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });

    //delete

    builder.addCase(removeTransaction.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    });
    builder.addCase(removeTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default transactionSlice.reducer;

export const { editActive, editInActive } = transactionSlice.actions;
