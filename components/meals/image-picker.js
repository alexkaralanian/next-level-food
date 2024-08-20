'use client';

import { useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [image, setImage] = useState();
  const imageInput = useRef();

  function handleClick() {
    imageInput.current.click();
  }

  function handleImageChange() {
    const file = imageInput.current.files[0];
    if (!file) {
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {image ? (
            <Image src={image} alt="Preview" fill />
          ) : (
            <p>No image chosen</p>
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          accept="image/png, image/jpeg"
          id={name}
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Choose Image
        </button>
      </div>
    </div>
  );
}
