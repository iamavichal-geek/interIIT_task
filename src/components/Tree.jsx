import react,{useState, useContext, useEffect} from "react";
import axios from "axios";
import "../styles/tree.css";

export default function Tree(){

    const [godowns, setGodowns] = useState([]);
    const [selectedGodown, setSelectedGodown] = useState(null);
    const [items, setItems] = useState([]);
    const [openChildGodowns, setOpenChildGodowns] = useState({});
    
    

return (


    <>
    <div className="tree-outer">
        <div className="tree-side-bar">
            
            </div>

            <div className="items">

            </div>
    </div>
    </>
)
}