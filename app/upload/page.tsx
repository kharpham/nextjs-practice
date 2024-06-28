"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('');
  return (
    <>
    {publicId && <CldImage src={publicId} width={1000} height={600} alt="An random image"/> }
    <CldUploadWidget
      options={{
        sources: ["local"],
        multiple: false,
        
      }}
      uploadPreset="ji3qsidh"
      onSuccess={(result, widget) => {
        if (result.event !== "success") return;
        const info = result.info as CloudinaryResult;
        setPublicId(_ => info.public_id);
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
    </>
  );
};

export default UploadPage;
