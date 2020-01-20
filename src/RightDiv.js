import React, { useState, useEffect } from 'react';
import './Type_language.css';
import axios from 'axios';
import Display_repos from './Display_repos';
import Language_filter from './Type_Language';
const RightDiv = (props) => {

    const [repoData, setRepoData] = useState([]);
    const [filterdata, setfilterdata] = useState([])
    const [type,setType]=useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [language, setLanguage] = useState("All");
    const [show, setshow] = useState(true);
    const [showdiv1, setShowdiv1] = useState(false)
    const [showdiv2, setShowdiv2] = useState(false)

    useEffect(() => {
        axios("https://api.github.com/users/supreetsingh247/repos")
            .then(res => {
                setRepoData(res.data);
            }).catch(error => {
                alert(error);
            })
        Result_Data()
    }, [searchKeyword, language]);

    // function to handle clear btn click event
    // this will reset searchKeyword and set language  to "All"
    const Clear_button = () => {
        console.log("before_lan" + language);
        setSearchKeyword("");
        setLanguage("All");
        console.log("after_lan" + language);
        setshow(true)
    }

    const set_lan = (item) => {
        setLanguage(item);
    }
    // To filter the data from the Occured repositories from the github based on the 
    //given keyword and the language
    const Result_Data = () => {
        if (searchKeyword !== '' && language !== 'All') {
            setfilterdata(repoData.filter((data) => {
                return (
                    ((data.name && data.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) ||
                        (data.description && data.description.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1))
                    &&
                    (data.language && data.language.toLowerCase().indexOf(language.toLowerCase()) !== -1)
                )
            }
            ))
            setshow(false)
        } else if (searchKeyword === '' && language !== 'All') {
            setfilterdata(repoData.filter((data) => {
                return (
                    (data.language && data.language.toLowerCase().indexOf(language.toLowerCase()) !== -1)
                )
            }
            ))
            setshow(false)
        } else if (searchKeyword !== '' && language === "All") {
            setfilterdata(repoData.filter((data) => {
                return (
                    ((data.name && data.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) ||
                        (data.description && data.description.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1))
                )
            }
            ))
            setshow(false)
        } else {
            setshow(true)
        }
    }


    console.log("repos", repoData);

    const Type_data = ["All", "Sources", "Forks", "Archieved", "Mirrors"];
    const Type_language = ["All", "HTML", "JavaScript", "CSS"];

    return (
        <div className="right-one">
            <div className="top-options">
                <nav className="options-nav">

                    <a className="options-item">
                        OverView
                    </a>
                    <a className="options-repos">
                        Repositories
                        <span id="span_id1" >
                            {props.info.public_repos}
                        </span>
                    </a>
                    <a className="options-item">
                        Projects
                        <span id="span_id1"  >
                            {props.info.public_gists}
                        </span>
                    </a>
                    <a className="options-item">
                        Stars
                        <span id="span_id1"  >
                            {10}
                        </span>
                    </a>
                    <a className="options-item">
                        Followers
                        <span id="span_id1"  >
                            {props.info.followers}
                        </span>
                    </a>
                    <a className="options-item">
                        Following
                        <span id="span_id1"  >
                            {props.info.following}
                        </span>
                    </a>
                </nav>
            </div>
            <div className="right_search">
                <div className="filter-div-option">
                    <input className="search_bar" type="text" onChange={(e) => { setSearchKeyword(e.target.value) }} value={searchKeyword} placeholder="Find a repository.." />
                </div>
                <div className="filter-div-option" >
                    <div>
                        <details id="filter_type">
                            <summary className="type_button" aria-haspopup="menu" role="button" onClick={
                                () => {
                                    setShowdiv1(true)
                                    setShowdiv2(false)
                                }
                            }>
                                <font className="font_id">Type:</font>
                                <span id="type_id">
                                    &nbsp;All
                                </span>
                                <span className="caret"></span>
                            </summary>
                            {showdiv1 && (
                                <details-menu className="menu_div" id="menu_div1" role="menu">
                                    <div className="menu_model">
                                        <header className="menu_header">
                                            <span className="menu_title">
                                                Select Type
                                        </span>
                                        </header>


                                        <div className="menu_list">
                                            {Type_data.map(
                                                item => {
                                                    return (
                                                        <label className="list_item" aria-checked="true" tabIndex="0">
                                                            <input type="radio" onClick={(e) => {
                                                                document.getElementById("type_id").innerHTML = `&nbsp;&nbsp;${item}`;
                                                                document.getElementById("filter_type")
                                                                setShowdiv1(false)
                                                            }} name="type" id="type_" value="" hidden="hidden" data-autosubmit="true" checked="checked" />

                                                            <span className="text-normal" data-menu-button-text="">{item}</span>
                                                        </label>
                                                    )
                                                }
                                            )
                                            }

                                        </div>
                                    </div>
                                </details-menu>
                            )
                            }

                        </details>
                    </div>

                     {/* For Language filter */}
                    <div>
                        <details id="filter_language" onClick={()=>{
                                    setShowdiv2(true)
                                    setShowdiv1(false)
                                }}>
                            <summary className="type_button" aria-haspopup="menu" role="button" onClick={
                                () => {
                                    setShowdiv1(true)
                                    setShowdiv2(false)
                                }
                            }>
                                <font className="font_id">Language:</font>
                                <span id="language_id">
                                    &nbsp;{language}
                                </span>
                                <span className="caret"></span>
                            </summary>
                            {showdiv2 && (
                                <details-menu className="menu_div" id="menu_div1" role="menu">
                                    <div className="menu_model2">
                                        <header className="menu_header">
                                            <span className="menu_title">
                                                Select Language
                                        </span>
                                        </header>


                                        <div className="menu_list">
                                            {Type_language.map(
                                                item => {
                                                    return (
                                                        <label className="list_item" aria-checked="true" tabIndex="0">
                                                            <input type="radio" onClick={(e) => {

                                                                // setShowdiv1(false)
                                                                setShowdiv2(false)

                                                                // document.getElementById("language_id").innerHTML = `&nbsp;&nbsp;${language}`;
                                                                // document.getElementById("filter_language")
                                                                set_lan(item)

                                                            }}
                                                                name="language" id="language_"
                                                                value="" hidden="hidden"
                                                                data-autosubmit="true" 
                                                            />

                                                            <span className="text-normal" data-menu-button-text="">{item}</span>
                                                        </label>
                                                    )
                                                }
                                            )
                                            }

                                        </div>
                                    </div>
                                </details-menu>
                            )
                            }

                        </details>
                    </div>

                   
                  
                </div>

            </div>

            <div className="repos_display_div">
                {
                    !show &&
                    <div className="clear_div">{filterdata.length}
                       &nbsp; results for repositories {searchKeyword ? <span>matching <b>{searchKeyword}</b></span> : null}
                        {language ? <span> written in <b>{language}</b></span> : null}
                        <span id="clear_button" onClick={Clear_button}>

                            <svg className="svg_clear" viewBox="0 0 12 14" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                            &nbsp;&nbsp;&nbsp;     Clear</span>
                    </div>

                }
                {
                    show &&
                    repoData.map((item, id) =>
                        <Display_repos key={id} repos_details={item} />)

                }
                {
                    !show && filterdata.map((item, id) =>
                        <Display_repos key={id} repos_details={item} />)
                }
            </div>
        </div>
    );
}

export default RightDiv;