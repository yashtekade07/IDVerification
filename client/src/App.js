import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./components/Home"
import Header from "./components/Header";
import Update from "./components/Update";
import Remove from "./components/Remove";
import Search from './components/Search'
import History from "./components/History";
function App() {
  return (
  <Router>
    <Header/>
    <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/search' element={<Search/>}/>
      <Route path = '/update' element={<Update/>}/>
      <Route path = '/remove' element={<Remove/>}/>
      <Route path = '/history' element={<History/>}/>
    </Routes> 
  </Router>
  );
}

export default App;
