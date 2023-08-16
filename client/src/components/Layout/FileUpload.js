// import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faIdCard } from '@fortawesome/free-solid-svg-icons'
import '../../css/FileUpload.css'
import axios from 'axios';
import { message } from "antd";


const FileUpload = ({ files, setFiles, removeFile }) => {
    const addHandler = (event, fileType) => {
        console.log("called");
        var file = event.target.files[0];
        // console.log(fileType);
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (file && allowedTypes.includes(file.type)) {
            setFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
            // console.log("files", fileType, files);
        }
        if (!file) {
            message.error("Unallowed file format!");
            return;
        }
        // setFiles([...files, file])
    }

  const uploadHandler = () => {
    // Upload each file
    if(localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(files);
        Object.keys(files).forEach((fileType) => {
        console.log(fileType);
        const file = files[fileType];
        if (file) {
            file.isUploading = true;

            // console.log(file);
            // let formData = {};
            // formData['newFile'] = file;
            // formData['fileType'] = fileType;
            // formData['userID'] = user._id;
            const formData = new FormData();
            formData.append('newFile', file);
            formData.append('fileType', fileType);  // Add fileType to the formData
            formData.append('userID', user._id); 

            console.log(formData);
            axios
            .post('http://localhost:8080/upload', formData)
            .then((res) => {
                file.isUploading = false;
                message.success('File uploaded successfully.');
                setFiles({});
            })
            .catch((err) => {
                console.error(err);
                message.error('File upload failed.');
            });
            // setFiles({});
        }
        });
    }
  };

//   useEffect(() => {
    // console.log(formData);
//   }, [formData]);

    return (
        <>
            <div className="file-card" key={Object.keys(files).length}>
                <h3>Upload Documents</h3>
                <ul className="document-list">
                    {[
                        { name: 'aadharCard', icon: faIdCard },
                        // { name: 'Aadhar card', icon: faIdCard },
                        { name: 'ProposalDoc', icon: faFileAlt }
                    ].map((doc, index) => (
                        <li key={index} className="document-list-item">
                            <span>{index + 1}. {doc.name}</span>
                            <div className="file-inputs">
                                <input type="file" onChange={(event) => addHandler(event, doc.name)} />
                                <button>
                                    <i>
                                        <FontAwesomeIcon icon={doc.icon} />
                                    </i>
                                    Add
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="main">Supported files</p>
                <p className="info">.pdf, .docx, .xlsx</p>
                <button className='final' onClick={uploadHandler}> Upload </button>
            </div>
        </>
    )
}

export default FileUpload