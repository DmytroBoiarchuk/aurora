import './App.scss';
import MastersPage from './pages/MastersPage/MastersPage';
import NavBar from './components/NavBar/NavBar';

function App(): JSX.Element {
  console.log('verion/0.0.1 branch');
  return (
    <>
      <NavBar />
      <MastersPage />
    </>
  );
}

export default App;
