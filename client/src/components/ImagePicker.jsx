"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <div>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && <Image src={pickedImage} alt="user image" fill />}
        </div>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="button" onClick={handlePickClick}>
        Pick an Image
      </button>
    </div>
  );
}
