import { Route, Routes } from 'react-router';
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
import Navigation from './pages/Navigation';
import Statistics from './pages/Statistics';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RequestStatus } from './@types/RequestStatus';
import { fetchBooks } from './redux/booksSlice';
import { AppDispatch, RootState } from './redux/store';

function App() {
  const bookStatus = useSelector((state: RootState) => state.books.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (bookStatus === RequestStatus.IDLE) {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/history' element={<History />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
