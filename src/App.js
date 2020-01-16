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
  const [data, setData] = useState({});

    useEffect(()=>{
        axios("https://api.github.com/users/supreetsingh247")
        .then((response)=>{
            //console.log(response.data);
            setData(response.data);
        })
        .catch((err)=>{
            setData({});
        })
    }, []);
  return (
    
    <div>
      <div>
        <Navigation_menu/>
        </div>
      <div className="main-div">
        <Leftdata/>
        <RightDiv info={data}/>
      </div>
    </div>
  );
}

export default App;
