import React, { useState } from "react";

export default function ProductImageUploader({ onImage }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onImage(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ marginTop: 10, maxHeight: 120, borderRadius: 6 }}
        />
      )}
    </div>
  );
}
