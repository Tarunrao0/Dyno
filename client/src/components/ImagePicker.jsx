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
    <div className="flex">
      <label htmlFor={name}>{label}</label>
      <div>
        <div>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="user image" width={50} height={50} />
          )}
        </div>
        <input
          className="hidden"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
      </div>
      <button
        className="block ml-14 mb-8 bg-white font-black px-2 text-inkblue rounded-lg transition-transform duration-300 hover:-translate-y-2 mx-auto"
        type="button"
        onClick={handlePickClick}
      >
        upload an image
      </button>
    </div>
  );
}
