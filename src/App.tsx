import './App.scss';
import MastersPage from './pages/MastersPage/MastersPage';
import NavBar from './components/NavBar/NavBar';

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <MastersPage />
    </>
  );
}

export default App;
