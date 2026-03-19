import "./style/home.css"
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"
function HomePage() {

    const navigate = useNavigate()
    const[stats,setstats]=useState('')
    const [user,setUser] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return navigate("/login");

        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            navigate("/login");
        }

    }, []);
    const handleLogout = () => {

        localStorage.removeItem("token")
        navigate("/login")

    }

    useEffect(()=>{
            axios.get("http://localhost:5000/api/items/stats").then((res)=>{
            setstats(res.data)
        })

    },[])
    useEffect(()=>{

        const token = localStorage.getItem("token")

        axios.get(
        "http://localhost:5000/api/user/me",
        {
        headers:{
        Authorization:`Bearer ${token}`
        }
        }
        )
        .then(res=>{

        setUser(res.data)

        })

    },[])
    
    return (

        <div className="home-page">

            {/* HEADER */}

            <header className="home-header">

                <div className="logo-section">

                    <div className="logo-icon">🔍</div>

                    <div>

                        <h1>Campus Find</h1>

                        <p>Lost & Found Platform</p>

                    </div>

                </div>

                <div className="user-section">

                    <div className="user-info">

                        <p className="user-name">{user?.username}</p>


                    </div>

                    <div className="user-avatar">

                        {user?.username?.[0]}

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            {/* MAIN */}

            <main className="home-main">

                {/* WELCOME */}

                <div className="welcome">

                    <h2>Welcome Back 👋</h2>

                    <p>What would you like to do today?</p>

                </div>

                {/* STATS */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <h3>{stats.lost}</h3>

                        <p>Lost Items</p>

                    </div>

                    <div className="stat-card">

                        <h3>{stats.found}</h3>

                        <p>Found Items</p>

                    </div>

                    <div className="stat-card">

                        <h3>{stats.reunited}</h3>

                        <p>Reunited</p>

                    </div>

                    <div className="stat-card">

                        <h3>1234</h3>

                        <p>Active Users</p>

                    </div>

                </div>

                {/* ACTION CARDS */}

                <div className="action-grid">

                    <div
                        className="action-card lost-card"
                        onClick={() => navigate("/report-lost")}
                    >

                        <h3>Report Lost Item</h3>

                        <p>Lost something on campus? Report it here.</p>

                        <button>Get Started</button>

                    </div>

                    <div
                        className="action-card found-card"
                        onClick={() => navigate("/report-found")}
                    >

                        <h3>Report Found Item</h3>

                        <p>Found something? Help return it.</p>

                        <button>Get Started</button>

                    </div>

                </div>

                {/* VIEW ITEMS */}

                <div className="browse-banner">

                    <div>

                        <h3>Browse All Items</h3>

                        <p>View all lost and found items</p>

                    </div>

                    <button
                        onClick={() => navigate("/getitems")}
                    >
                        View All
                    </button>

                </div>

                {/* QUICK LINKS */}

                <div className="quick-links">

                    <h3>Quick Links</h3>

                    <div className="links-grid">

                        <div className="link-card">

                            <div className="icon purple">
                                🔍
                            </div>

                            <div className="link-text">
                                <p className="link-title">Browse Items</p>
                                <p className="link-sub">View all lost & found</p>
                            </div>

                        </div>

                        <div className="link-card">

                            <div className="icon blue">
                                📍
                            </div>

                            <div className="link-text">
                                <p className="link-title">My Reports</p>
                                <p className="link-sub">Track your items</p>
                            </div>

                        </div>

                        <div className="link-card">

                            <div className="icon green">
                                👥
                            </div>

                            <div className="link-text">
                                <p className="link-title">Contact Support</p>
                                <p className="link-sub">Get help anytime</p>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )

}

export default HomePage