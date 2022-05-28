import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from '../@types/Book';
import { RequestStatus } from '../@types/RequestStatus';
import { RootState } from './store';

export interface BooksSlice {
  list: Book[];
  status: RequestStatus;
  error: string | undefined;
}

const initialState: BooksSlice = {
  list: [],
  status: RequestStatus.IDLE,
  error: undefined,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get<Book[]>(`/books`);
  return response.data;
});

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction<Book[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = RequestStatus.FAIL;
        state.error = action.error.message;
      });
  },
});

export const getBooksInProgress = (state: RootState) => {
  return state.books.list.filter(
    (book) => book.progress !== 0 && book.progress !== book.pageCount,
  );
};

export const { getBooks } = booksSlice.actions;

export default booksSlice.reducer;
