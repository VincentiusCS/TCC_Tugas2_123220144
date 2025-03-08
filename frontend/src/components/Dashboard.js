import React from 'react'
import "./styles.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='container'>
        <header className="header">
            <div className="header-content">
                <a href="/">
                <img src="/assets/HeyNotesLogo.png" alt="Kurir Logo" className="logo" />
                </a>
            </div>
        </header>

        <div className='dashboard'>
            <div className="dashboard-container">
                <div className='card'>
                    <p>Welcome to HeyNotes</p>
                    <div className='stats-container'>
                        <div className='stat-box'>
                            <img src="/assets/Notes.png" alt="Notes Icon"/>
                            <p><Link to="/notes">Notes</Link></p>
                        </div>
                        <div className='stat-box'>
                            <img src="/assets/AddNotes.png" alt="Add Notes Icon" />
                            <p><Link to="/add">Add Notes</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <p>Praktikum TCC IF-D || UPNVYK</p>
        </footer> 
    </div>
  )
}

export default Dashboard;
