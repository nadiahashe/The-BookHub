import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

interface ProfilePicEditorProps {
  onSave: (imageData: string) => void; // Callback to send the final image back to the parent
  onCancel: () => void; // Callback to close the editor without saving
}

const ProfilePicEditor: React.FC<ProfilePicEditorProps> = ({ onSave, onCancel }) => {
  const [image, setImage] = useState<File | null>(null);
  const [zoom, setZoom] = useState(1);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const imageData = canvas.toDataURL(); // Base64 string of the cropped image
      onSave(imageData); // Pass the image back to the parent
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <AvatarEditor
          ref={setEditor}
          image={image}
          width={200}
          height={200}
          border={50}
          borderRadius={100}
          color={[255, 255, 255, 0.6]}
          scale={zoom}
        />
      )}
      <input
        type="range"
        min="1"
        max="3"
        step="0.1"
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button> {/* Cancel button */}
      </div>
    </div>
  );
};

export default ProfilePicEditor;
