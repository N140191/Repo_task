import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './git_repo.scss';
import axios from 'axios';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';
import Leftdata from './Left_data';
import Navigation_menu from './Navigation_menu';
function App() {
  const [Repository_data, setRepo_Data] = useState({});

    useEffect(()=>{
        axios("https://api.github.com/users/supreetsingh247")
        .then((response)=>{
           
            setRepo_Data(response.data);
        })
        .catch((err)=>{
            setRepo_Data({});
        })
    }, []);
  return (
    
    <div>
      <div>
        <Navigation_menu/>
        </div>
      <div className="main-div">
        <Leftdata/>
        <RightDiv info={Repository_data}/>
      </div>
    </div>
  );
}

export default App;
