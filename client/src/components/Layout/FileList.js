import axios from 'axios'
import React from 'react'
import FileItem from './FileItem';
import '../../css/FileList.css'

const FileList = ({ files, removeFile }) => {
//   const filesArray = Object.keys(files).map((fileType) => ({
//     name: files[fileType].name,
//     isUploading: files[fileType].isUploading,
//   }));

    const deleteFileHandler = (_name) => {
        axios.delete(`http://localhost:8080/upload?name=${_name}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }

    return (
        <ul className="file-list">
            {
                files &&
                Object.entries(files).map(([fileType, file]) => (
                    <FileItem
                      key={file.name}
                      file={file}
                      fileType={fileType}  
                      deleteFile={deleteFileHandler}
                    />
                  ))}
            {/* filesArray.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            } */}
        </ul>
    )
}
 
export default FileList