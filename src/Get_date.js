import React from 'react';

const Get_date=(props)=>
{
    function  get_date(update_date){
        if(update_date!==null)
        {
        let check=update_date.split(':')
        let sub=check[0].split('-')
        let month=''
        if(sub[1]===1)
        month='Jan'
        else if(sub[1]===2)
        month='Feb'
        else if(sub[1]===3)
        month='Mar'
        else if(sub[1]===4)
        month='Apr'
        else if(sub[1]===5)
        month='May'
        else if(sub[1]===6)
        month='June'
        else if(sub[1]===7)
        month='July'
        else if(sub[1]===8)
        month='Aug'
        else if(sub[1]===9)
        month='Sep'
        else if(sub[1]===10)
        month='Oct'
        else if(sub[1]===11)
        month='Nov'
        else if(sub[1]===12)
        month='Dec'
        else
        month=sub[1]
        return sub[2].substring(0,2)+" "+month+" "+sub[0]
        }
        }
        return(
                <a>
                {get_date(props.date_info)}                
            </a>
        );
}
export default Get_date;