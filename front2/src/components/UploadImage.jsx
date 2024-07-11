import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, fetchImages } from '../redux/imageSlice'; // Adjust the path according to your project structure

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  const loading = useSelector((state) => state.image.loading);
  const error = useSelector((state) => state.image.error);

  const handleUpload = () => {
    if (file && description) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      dispatch(uploadImage(formData));
    }
  };

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload} disabled={loading}>
        Upload
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {images.length > 0 && (
        <div>
          <br />
          {images.map((image) => (
            <div key={image._id}>
              <img src={`http://localhost:3000/images/${image.image}`} alt="" />
              <p>{image.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
