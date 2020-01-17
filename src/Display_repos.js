import React from 'react';
import './git_repo.scss';
import Get_date from './Get_date';

const Display_repos=(props)=>{
        console.log("props",props)
        return(
            <div id="repos_display_div" style={{marginRight:"3%"}}>
                <div className="results_div_item">
                    <div>
                        <div className="repo_name_div">

                            <h3><a id="repo_name"href="#">{props.repos_details.name}</a></h3>
                            <p><small>{props.repos_details.description}</small></p>

                        </div>
                        <div className="repo_description_div">
                            {
                                (props.repos_details.language)?(<span className="repo_description_div_item">
                                <span className="dot_language" ></span> {props.repos_details.language}
                            </span> ):null
                            }
                            <span>	&#9733;{props.repos_details.stargazers_count}</span>
                            &nbsp;
                            <span className="repo_description_div_item">
                                Updated on <Get_date date_info={props.repos_details.updated_at}/> 
                                
                            </span>
                        </div>
                    </div>
                    <div className="star_display_div">
                        <div style={{marginTop:"10px"}}>
                            <button className="star_btn">&#9733; Star</button>
                        </div>
                        
                        <div style={{marginTop:"25px"}}> 
                            <svg width="155" height="30"><g transform="translate(0, -12)"><rect x="0" y="-2" width="155" height="16" style={{backgroundColor:"green", fill:"#d7ecae"}}></rect></g></svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default Display_repos;