import React, { useContext, useEffect, useState } from 'react';
import ShowIcon from './ShowIcon'
import PopoverShow from './PopoverShow'

function ForegroundA() {


    const [selectedText, setSelectedText] = useState('');

    //Show icon when user bold highlight text
    const [showIcon, setShowIcon] = useState(false);
    const [x,setX]= useState(0);
    const [y,setY]= useState(0);


    let [showInfo1, setShowInfo1] = useState(true);



    //console.log(selectedText);

    return (
        <div> 
            <h1>HHHHHH</h1>

        </div>
    )
}

export default ForegroundA;