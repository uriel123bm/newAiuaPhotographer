import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/EventPage.css';

function EventPage({ event }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [message, setMessage] = useState("");
    const [qrImage, setQrImage] = useState(null);
    const [editMode, setEditMode] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 25;

    useEffect(() => {
        setUploadProgress(0);
        setQrImage(null);
        setMessage("");
        setImages([]);
        setPreviewImages([]);
        setCurrentPage(1);
    }, [event]);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
        const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
        setUploadProgress(0);
        setCurrentPage(1);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        axios.post(`http://localhost:8000/add-photos/?event-id=${event.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    setImages([]);
                    setMessage("The upload was successful!");
                    setUploadProgress(0);
                } else {
                    setMessage("We could not upload the photos. Please try again!");
                }
                setTimeout(() => setMessage(""), 2000);
            })
            .catch(error => {
                console.error("There was an error uploading the images!", error);
                setMessage("There was an error uploading the images!");
            });
    };

    const handleQr = () => {
        axios.get(`http://localhost:8000/get-qr?event-id=${event.id}`, { responseType: 'blob' })
            .then((response) => {
                const qrImageUrl = URL.createObjectURL(response.data);
                setQrImage(qrImageUrl);
            })
            .catch((error) => {
                console.error("Error fetching QR code:", error);
            });
    };

    const closeQr = () => {
        setQrImage(null);
    };

    const openEditMode = () => {
        setEditMode(true);
    };

    const closeEditMode = () => {
        setEditMode(false);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);
        setImages(newImages);
        setPreviewImages(newPreviews);
    };


    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = previewImages.slice(indexOfFirstImage, indexOfLastImage);

    const nextPage = () => {
        if (currentPage < Math.ceil(previewImages.length / imagesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={"event-page-container"}>
            <div className={"event-page-title"}>
                <h1 className="event-name">{event.name} {!event.is_open && <span>🔒</span>}</h1>
                <div className="event-details">
                    <span className="event-date">{event.date}</span>
                    <span style={{ fontWeight: "bold" }}> · </span>
                    <span className="event-location">{event.location}</span>
                </div>
                <button id={"qr-button"} className="event-button" onClick={handleQr}>QR</button>
            </div>

            {
                event.is_open ?
                    <div className={"event-page-body"}>
                        <h3>Upload Photos</h3>
                        <input
                            type="file"
                            className={"upload-input"}
                            onChange={handleFileSelect}
                            multiple
                        />
                        <button
                            className={"event-button"}
                            onClick={openEditMode}
                            disabled={images.length === 0}
                        >
                            Edit
                        </button>

                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <button
                            className={"upload-button"}
                            onClick={handleSubmit}
                            disabled={images.length === 0 || uploadProgress === 100}
                        >
                            Upload
                        </button>
                        {message}
                    </div>
                    :
                    <div className={"centered-message"}>
                        Event locked, no more photos can be uploaded
                    </div>
            }

            {qrImage && (
                <div className="qr-code-popup">
                    <span className="close" onClick={closeQr}>&times;</span>
                    <img src={qrImage} alt="QR Code" className="qr-image" />
                    <a href={qrImage} download={`${event.name}_qr_code.jpg`}>Download QR Code</a>
                </div>
            )}

            {editMode && (
                <div className="edit-popup">
                    <div className="edit-content">
                        <h3>Edit Selected Images</h3>
                        <div className="image-preview-container">
                            {currentImages.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <img src={image} alt={`Selected ${index}`} />
                                    <button className="remove-button" onClick={() => removeImage(index)}>X</button>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span>Page {currentPage}</span>
                            <button className="pagination-button" onClick={nextPage} disabled={currentPage === Math.ceil(previewImages.length / imagesPerPage)}>
                                Next
                            </button>
                        </div>
                        <button className="save-button" onClick={closeEditMode}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventPage;
