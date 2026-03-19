import { useState,useEffect } from "react"
import axios from "axios"
import "./style/report.css"
import { useNavigate } from "react-router-dom"

function ReportFound() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return navigate("/login");

        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            navigate("/login");
        }

    }, []);
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [dateFound, setDateFound] = useState("")
    const [contact, setContact] = useState("")
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const formData = new FormData()

            formData.append("title", title)
            formData.append("category", category)
            formData.append("description", description)
            formData.append("location", location)
            formData.append("dateLost", dateFound)   // backend field
            formData.append("contact", contact)
            formData.append("type", "found")
            formData.append("image", image)

            await axios.post(
                "http://localhost:5000/api/items/report",
                formData
            )

            alert("Found item reported successfully")

            setTitle("")
            setCategory("")
            setDescription("")
            setLocation("")
            setDateFound("")
            setContact("")
            setImage(null)

        } catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="report-page">

            <div className="report-header">

                <div className="report-logo">🔍</div>

                <h1>Report Found Item</h1>

                <p>Help return the item to its rightful owner</p>

            </div>

            <div className="report-card">

                <form onSubmit={handleSubmit}>

                    <label>Item Name</label>

                    <input
                        type="text"
                        placeholder="e.g. Black Backpack, iPhone 13"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >

                        <option>Select a category</option>
                        <option>Electronics</option>
                        <option>Wallet</option>
                        <option>Bag</option>
                        <option>ID Card</option>
                        <option>Keys</option>
                        <option>Other</option>

                    </select>

                    <label>Description</label>

                    <textarea
                        placeholder="Provide detailed description (color, brand, distinctive features)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="row">

                        <div>

                            <label>Found Location</label>

                            <input
                                type="text"
                                placeholder="e.g. Library, Cafeteria"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                        </div>

                        <div>

                            <label>Date Found</label>

                            <input
                                type="date"
                                value={dateFound}
                                onChange={(e) => setDateFound(e.target.value)}
                            />

                        </div>

                    </div>

                    <label>Contact Number</label>

                    <input
                        type="Number"
                        placeholder="Enter your phone number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />

                    <label>Upload Image (Optional)</label>

                    <div className="upload-box">

                        <i className="fa-solid fa-upload"></i>

                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                            {image ? (
                                <p className="file-name">{image.name}</p>
                            ) : (
                                <p>Click to upload image</p>
                            )}

                        <span>PNG, JPG up to 5MB</span>

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Submit Report
                    </button>

                </form>

                <div className="tip">

                    Tip: Providing a clear description helps the owner recognize their item faster.

                </div>

                <div className="back">

                  <a href="/home">← Back to Dashboard</a>  

                </div>

            </div>

        </div>

    )

}

export default ReportFound