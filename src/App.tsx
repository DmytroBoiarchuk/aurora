import './App.scss';
import React from 'react';
import MastersPage from './pages/MastersPage/MastersPage';
import NavBar from './components/NavBar/NavBar';

function App(): JSX.Element {
  console.log('Main Branch');
  //test

  return (
    <>
      <NavBar />
      <MastersPage />
    </>
  );
}

export default App;
