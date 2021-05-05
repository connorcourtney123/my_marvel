import {useState, useEffect} from 'react'
import './App.css'
import NavBar from './components/NavBar'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import CommunityLists from './pages/CommunityLists'
import UserLists from './pages/UserLists'
import CreateList from './pages/CreateList'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import ListDetails from './pages/ListDetails'
import EditList from './pages/EditList'
import axios from 'axios'
import env from 'react-dotenv'


function App() {


    const [user, setUser] = useState({})
    const [allLists, setAllLists] = useState([])


    const fetchAllLists = async () => {
      try{
    
        let lists = await axios.get(`http://localhost:3000/list/`)

        

        setAllLists(lists.data.lists)

      



      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
      fetchAllLists()
    }, [])

    const verifyUser = async () => {
      try{
        let response = await axios.get(`http://localhost:3000/user/verify`, {
          headers: {
            Authorization: localStorage.userId
          }
        })
        
        setUser({username: response.data.username, userId: response.data.userId})

      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
      verifyUser()
    }, [])



  return (
    
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser}/>
        <Switch>
        
        <Route
        exact path="/home" 
        render={() => {
          return <CommunityLists allLists={allLists} user={user}/>
        }}
        />
           <Route
        exact path="/myLists" 
        render={() => {
          if(JSON.stringify(user) !== '{}'){
            return <UserLists user={user}/>
          }else{
            return <LogIn user={user} setUser={setUser}/>
          }
          
        }}
        />
           <Route
        exact path="/create" 
        render={() => {
          if(JSON.stringify(user) !== '{}'){
            return <CreateList user={user}/>
          }else{
            return <LogIn user={user} setUser={setUser}/>
          }
          
        }}
        />

          <Route
        exact path="/signup" 
        render={() => {
          if(JSON.stringify(user) === '{}'){
          return <SignUp user={user} setUser={setUser}/>
        }else{
          return <UserLists user={user}/>
        }
        }}
        />
          <Route
        exact path="/login" 
        render={() => {
          if(JSON.stringify(user) === '{}'){
            return <LogIn user={user} setUser={setUser}/>
          }else{
            return <UserLists user={user}/>
          }
          
        }}
        />

          <Route exact path="/listDetails" component={ListDetails}/>

          <Route exact path="/editList" component={EditList}/>
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
