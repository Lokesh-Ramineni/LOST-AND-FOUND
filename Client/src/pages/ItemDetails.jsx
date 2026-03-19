import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import "./style/items.css"
function GetItems(){
    const navigate=useNavigate()
    const [item,setitem]=useState([])
    const [filter,setFilter] = useState("all")
    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) return navigate("/login");
    
        const payload = JSON.parse(atob(token.split(".")[1]));
    
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    
    }, []);
    useEffect(()=>{
            axios.get("http://localhost:5000/api/items/get-items").then((res)=>{
            setitem(res.data)
        })

    },[])
    const filteredItems = item.filter(items=>{
        if(filter==="all") return true
        return items.type === filter
    })

    return(

        <div className="items-page">

            {/* HEADER */}

            <div className="items-header-top">

                <button
                    className="back-btn"
                    onClick={()=>navigate("/home")}
                >
                    ← Back to Home
                </button>

                <div className="header-logo">
                    🔍 <span>Campus Find</span>
                </div>

            </div>


            {/* TITLE */}

            <div className="items-header">

                <h1>All Items</h1>
                <p>Browse all lost and found items on campus</p>

            </div>


            {/* FILTER BUTTONS */}

            <div className="items-filter">

                <button
                className={filter==="lost" ? "active" : ""}
                onClick={()=>setFilter("lost")}
                >
                    Lost Items
                </button>

                <button
                className={filter==="found" ? "active" : ""}
                onClick={()=>setFilter("found")}
                >
                    Found Items
                </button>

            </div>


            {/* ITEMS GRID */}

            <div className="items-grid">

                {filteredItems.map(item => (

                    <div key={item._id} className="item-card">

                        <span className={`status ${item.type}`}>
                            {item.type}
                        </span>

                        <div className="item-header">

                            <h3>{item.title}</h3>

                            <p className="category">{item.category}</p>

                        </div>


                        <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.title}
                        className="item-image"
                        />


                        <div className="item-body">

                            <p className="desc">
                                {item.description}
                            </p>

                            <p>📍 {item.location}</p>

                            <p>📞 {item.contact}</p>

                            <p className="date">
                                Posted on {new Date(item.createdAt).toDateString()}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )
}
export default GetItems