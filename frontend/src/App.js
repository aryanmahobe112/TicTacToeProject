import { Route, Routes } from 'react-router-dom';
import GetPlayerNames from './components/getPlayerNames';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<GetPlayerNames></GetPlayerNames>}></Route>
        <Route exact path='/tictactoe' element={<TicTacToe></TicTacToe>}></Route>
      </Routes>
    </div>
  );
}

export default App;
