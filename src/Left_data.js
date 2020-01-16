import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LeftDiv from './LeftDiv';
import './git_repo.scss';
class Leftdata extends Component {
    constructor() {
        super();
        this.state = {
            post: []
        }
    }
    componentDidMount() {
        axios.get("https://api.github.com/users/supreetsingh247").then(
            res => {
                this.setState({
                    post: res.data
                })

                console.log(this.state.post)
                console.log(res.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )

    }
    render() {
        const { post } = this.state;
        // console.log("maindata"+post)
        return (<div>

            <LeftDiv 
            imag={post.avatar_url}
            name={post.name}
            id={post.login}
            bio={post.bio} 
            company={post.company}
            location={post.location}
            email={post.email}
            />
        </div>
        )
    }
}
export default Leftdata; 