import './styles/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TripEditor from './components/TripEditor';

function App() {
  return (
    <>
      <Header />
      <div className='app-layout'>
        <Sidebar />
        <TripEditor />
      </div>
    </>
  )
};

export default App;
