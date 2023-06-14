import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AuthForm from '../AuthForm/AuthForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';




export default function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }/>
      }/>
      <Route path='/signin' element={
        <>
          <AuthForm />
        </>
      }/>
      <Route path='/signup' element={
        <>
          <AuthForm />
        </>
      }/>
    </Routes>
  );
};

