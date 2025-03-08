import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import { useNavigate } from 'react-router-dom';

const AddNotes = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null); // Untuk preview gambar

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview); // Hapus URL untuk menghindari memory leak
            }
        };
    }, [preview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validasi tipe file
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (!allowedTypes.includes(file.type)) {
                alert("Hanya file JPG, JPEG, atau PNG yang diperbolehkan.");
                return;
            }

            // Validasi ukuran file (maks 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("Ukuran gambar terlalu besar! Maksimal 2MB.");
                return;
            }

            setPicture(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const saveMsg = async (e) => {
        setErrorMessage('');

        e.preventDefault();
        const formData = new FormData();
        formData.append('message', message);
        if (picture) {
            formData.append('photo', picture); // 
        }

        try {
            await axios.post("http://localhost:5000/add-notes", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('');
            setPicture(null);
            setPreview(null);
            navigate("/notes")

        } catch (error) {
            if (error.response) {
                setErrorMessage("Server responded with error: " + error.response.data);
            } else if (error.request) {
                setErrorMessage("No response received from server.");
            } else {
                setErrorMessage("Error setting up request: " + error.message);
            }
        }
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <a href="/">
                    <img src="/assets/HeyNotesLogo.png" alt="Kurir Logo" className="logo" />                        </a>
                </div>
            </header>

            <div className="dashboard-container">
                <div className="card">
                <h2>Add a New Note</h2>
                <form onSubmit={saveMsg}>
                    <div>
                        <label>Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <label>Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {preview && <img src={preview} alt="Preview" width="100px" />}
                    </div>
                    <button type="submit" className='button-s'>Add Note</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
                </div>
            </div>
            <footer>
                <p>Praktikum TCC IF-D || UPNVYK</p>
            </footer>        
        </div>    
    );
};

export default AddNotes;
