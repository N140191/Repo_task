import React, { useState, useEffect } from 'react';
import './Type_language.css';
import axios from 'axios';
import Display_repos from './Display_repos';
import Language_filter from './Type_Language';
const RightDiv = (props) => {
    const [repoData, setRepoData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [language, setLanguage] = useState("");
    const [type, setType] = useState("");
    const [showdiv1, setShowdiv1] = useState(false)
    const [showdiv2, setShowdiv2] = useState(false)

    useEffect(() => {
        axios("https://api.github.com/users/supreetsingh247/repos")
            .then(res => {
                setRepoData(res.data);
                console.log(res.data);
            }).catch(error => {
                alert(error);
            })
    }, []);


    // to filter the data from the repoData based on the search_keyword and language selection
    const getFinalData = (keyword, lang) => {
        var originalData = repoData.slice(0);   // taking copy
        var finalData = [];
        var regKeyword = new RegExp(keyword, "i");
        var regLang = new RegExp(lang, "i");
        if (keyword == "" && lang == "") {
            return originalData;
        } else if (keyword != "" && lang != "") {
            //looping through array
            originalData.forEach(function (item, index) {
                if ((item.name.search(regKeyword) != -1) && (item.language && item.language.search(regLang) != -1)) {
                    finalData.push(item);
                }
            })
        } else if (keyword != "") {
            //looping through array
            originalData.forEach(function (item, index) {
                if (item.name.search(regKeyword) != -1) {
                    finalData.push(item);
                }
            });
        } else if (language != "") {
            //looping through array
            originalData.forEach(function (item, index) {
                if (item.language && item.language.search(regLang) != -1) {
                    finalData.push(item);
                }
            });
        }
        return finalData;
    }

    // function to handle clear btn click event
    // this will reset searchKeyword and language state elements
    const handleClear = () => {
        console.log("celared");
        setSearchKeyword("");
        setLanguage("");
    }

    const finalData = getFinalData(searchKeyword, language);

    return (
        <div className="right-one">
            <div className="top-options">
                <nav className="options-nav">
                   
                    <a className="options-item">
                        OverView
                    </a>
                    <a className="options-repos">
                        Repositories
                        <span id="span_id" >
                            {props.info.public_repos}
                        </span>
                    </a>
                    <a className="options-item">
                        Projects
                        <span id="span_id"  >
                            {props.info.public_gists}
                        </span>
                    </a>
                    <a className="options-item">
                        Stars
                        <span id="span_id"  >
                            {10}
                        </span>
                    </a>
                    <a className="options-item">
                        Followers
                        <span id="span_id"  >
                            {props.info.followers}
                        </span>
                    </a>
                    <a className="options-item">
                        Following
                        <span id="span_id"  >
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
                                ()=>{
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
                            { showdiv1 && (
                            <details-menu className="menu_div" id="menu_div1" role="menu">
                                <div className="menu_model">
                                    <header className="menu_header">
                                        <span className="menu_title">
                                            Select Type
                                        </span>
                                    </header>


                                    <div className="menu_list">
                                        <label className="list_item" aria-checked="true" tabindex="0">
                                            <input type="radio" onChange={(e) => { document.getElementById("type_id").innerHTML = "&nbsp;&nbsp;All"; document.getElementById("filter_type").removeAttribute("open") }} name="type" id="type_" value="" hidden="hidden" data-autosubmit="true" checked="checked" />

                                            <span className="text-normal" data-menu-button-text="">All</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("type_id").innerHTML = "&nbsp;&nbsp;" + e.target.value; document.getElementById("filter_type").removeAttribute("open") }} name="type" id="type_source" value="source" hidden="hidden" data-autosubmit="true" />

                                            <span className="text-normal" data-menu-button-text="">Sources</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("type_id").innerHTML = "&nbsp;&nbsp;" + e.target.value; document.getElementById("filter_type").removeAttribute("open") }} name="type" id="type_fork" value="fork" hidden="hidden" data-autosubmit="true" />

                                            <span className="text-normal" data-menu-button-text="">Forks</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("type_id").innerHTML = "&nbsp;&nbsp;" + e.target.value; document.getElementById("filter_type").removeAttribute("open") }} name="type" id="type_archived" value="archived" hidden="hidden" data-autosubmit="true" />

                                            <span className="text-normal" data-menu-button-text="">Archived</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("type_id").innerHTML = "&nbsp;&nbsp;" + e.target.value; document.getElementById("filter_type").removeAttribute("open") }} name="type" id="type_mirror" value="mirror" hidden="hidden" data-autosubmit="true" />
                                            <span className="text-normal" data-menu-button-text="">Mirrors</span>
                                        </label>
                                    </div>
                                </div>
                            </details-menu>
                            )
                            }

                        </details>
                    </div>

                    {/* Language filter */}
                    <div>
                        <details id="filter_language">
                            <summary className="type_button" aria-haspopup="menu" role="button" onClick={
                                ()=>{
                                    setShowdiv2(true)
                                    setShowdiv1(false)
                                }
                            }>
                                <font className="font_id">Language:</font>
                                <a data-menu-button="" id="language_id">
                                    &nbsp;&nbsp;{language != "" ? language : "All"}
                                </a>
                                <span className="caret"></span>
                            </summary>
                            {showdiv2 &&(
                            <details-menu className="menu_div" role="menu" id="menu_div1">
                                <div className="menu_model1">
                                    <header className="menu_header">
                                        <span className="menu_title" >Select language</span>
                                    </header>
                                    <div className="menu_list">
                                        <label className="list_item" aria-checked="true" tabindex="0">
                                            <input type="radio" onChange={(e) => {
                                                document.getElementById("filter_language").removeAttribute("open");
                                                setLanguage("")
                                            }}
                                                name="language" id="language_"
                                                value="" hidden="hidden"
                                                data-autosubmit="true" checked="checked"
                                            />
                                            <span className="text-normal" data-menu-button-text="">All</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => {
                                                document.getElementById("filter_language").removeAttribute("open");
                                                setLanguage(e.target.value)
                                            }}
                                                name="language" id="language_html"
                                                value="html" hidden="hidden"
                                                data-autosubmit="true" />
                                            <span className="text-normal" data-menu-button-text="">HTML</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("filter_language").removeAttribute("open"); setLanguage(e.target.value) }} name="language" id="language_javascript" value="javascript" hidden="hidden" data-autosubmit="true" />
                                            <span className="text-normal" data-menu-button-text="">JavaScript</span>
                                        </label>
                                        <label className="list_item"  >
                                            <input type="radio" onChange={(e) => { document.getElementById("filter_language").removeAttribute("open"); setLanguage(e.target.value) }} name="language" id="language_css" value="css" hidden="hidden" data-autosubmit="true" />
                                            <span className="text-normal" data-menu-button-text="">CSS</span>
                                        </label>
                                    </div>
                                </div>
                            </details-menu>
                            )}
                        </details>
                    </div>
                </div>

            </div>

            <div className="repos_display_div">
                {
                    (searchKeyword || language) ?
                        ((finalData.length) ?
                            (<div className="clear_div">{finalData.length} results for repositories {searchKeyword ? <span>matching <b>{searchKeyword}</b></span> : null} {language ? <span>written in <b>{language}</b></span> : null}<a id="clear_btn" onClick={() => handleClear()}><svg className="svg_clear" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg> &nbsp;&nbsp;&nbsp;     Clear</a></div>)
                            : null)
                        : null
                }
                {
                    finalData.length ?
                        (finalData.map((item, id) =>
                            <Display_repos key={id} repos_details={item} />))
                        : <Display_repos repos_details={{}} />
                }
            </div>
        </div>
    );
}

export default RightDiv;