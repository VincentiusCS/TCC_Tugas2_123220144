import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const Notebook = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMsg();
  }, []);

  const getMsg = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notebook");
      setMessages(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const deleteMsg = async (id) => {
    console.log("Delete notes called for ID:", id);
    try {
      await axios.delete(`http://localhost:5000/delete-notes/${id}`);
      await getMsg();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <nav>
            <ul className="nav">
              <a href="/"><img src="/assets/HeyNotesLogo.png" alt="Hey Notes" className="logo" /></a>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/add">Add Notes</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="m-2 columns is-centered">
        <div className="column is-half">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Notes</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <tr key={msg.id}>
                    <td>{index + 1}</td>
                    <td>{msg.notes}</td>
                    <td>
                      {msg.pictures ? (
                        <img src={`http://localhost:5000/uploads/${msg.pictures}`} alt="Cover" className="image" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <Link to={`/edit/${msg.id}`} className="button is-small is-info">Edit</Link>
                      <button onClick={() => deleteMsg(msg.id)} className="button is-small is-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer>
        <p>Praktikum TCC IF-D || UPNVYK</p>
      </footer>
    </div>
  );
};

export default Notebook;
