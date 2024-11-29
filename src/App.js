import './App.css';
import Chat from './components/Chat';
import Gen from './components/Gen';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <div className='main'>
        <Nav />
        <div className='chat-cont'>
          <Gen />
          <Chat />
        </div>
      </div>
    </>
  );
}

export default App;
