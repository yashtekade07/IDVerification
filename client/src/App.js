import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./components/Home"
import Header from "./components/Header";
import Update from "./components/Update";
import Remove from "./components/Remove";
import Search from './components/Search'
import History from "./components/History";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
function App() {
  const {loading}=useSelector(state=>state.user);
  const {loading:profileloading}=useSelector(state=>state.profile)
  return (
    <Router>
    {(loading || profileloading)?(<Loader/>):(
      <>
    <Header/>
    <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/search' element={<Search/>}/>
      <Route path = '/update' element={<Update/>}/>
      <Route path = '/remove' element={<Remove/>}/>
      <Route path = '/history' element={<History/>}/>
    </Routes> 
  </>)}
  </Router>
  )
}

export default App;
