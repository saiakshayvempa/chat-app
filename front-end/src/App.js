import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'



import Home from "./components/Home";
import GroupCreate from "./components/GroupCreate";
import GroupDetail from "./components/GroupDetail";
import GroupList from "./components/GroupList";
import Chats from "./components/Chats";
import GroupUpdate from "./components/GroupUpdate";
import AddPeople from "./components/AddPeople";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Protected from "./components/Protected";
import GroupChat from "./components/GroupChat";
import Calls from './components/Calls';
import Connect from './components/Connect';
// import SignIn from './components/Signln';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route element={<Protected />}>
            <Route path="/list" element={<GroupList />} />
            <Route path="/calls/:id" element={<Calls />} />
            
            <Route path="/create" element={<GroupCreate />} />
            <Route path="/detail" element={<GroupDetail />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/GroupChat" element={<GroupChat />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/update/:id" element={<GroupUpdate />} />
            <Route path="/detail/:id" element={<GroupDetail />} />
            <Route path="/addpeople/:id" element={<AddPeople />} />
          </Route>
        </Routes>
      </Router>
      <Connect/>
    </div>
  );
}


export default App;
