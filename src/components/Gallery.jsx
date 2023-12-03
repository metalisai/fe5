import React, { useState } from 'react';
import './Gallery.css';
import CloseIcon from '../assets/images/icon-close-orange.svg';
import NextIcon from '../assets/images/icon-next.svg';
import PrevIcon from '../assets/images/icon-previous.svg';

const ImageThumb = ((props) => {
  return (
    <div className={`thumbnail${props.isCurrent ? " active" : ""}`}>
      <img src={props.image.thumb} alt={props.image.alt} onClick={() => props.setCurrentImage(props.idx)} />
    </div>
  );
});

const Image = ((props) => {
  const currentImage = props.currentImage;
  const viewImage = props.images[currentImage];

  const nextImage = () => {
    props.setCurrentImage((currentImage + 1) % props.images.length)
  }

  const prevImage = () => {
    props.setCurrentImage((currentImage + props.images.length - 1) % props.images.length)
  }

  return (
    <div className="currentImage">
      <div>
        <img src={viewImage.src} className="largeImg" width={viewImage.width} height={viewImage.height} alt={viewImage.alt} onClick={() => props.setIsLightboxOpen(true)}/>
        <div className="imgBtns">
          <div className="imgBtn next" onClick={nextImage}>
            <img src={NextIcon} alt="Next" />
          </div>
          <div className="imgBtn prev" onClick={prevImage}>
            <img src={PrevIcon} alt="Previous" />
          </div>
        </div>
      </div>
      <div className="thumbnails">
        {props.images.map((image, index) =>
          <ImageThumb key={index} image={image} isCurrent={index === currentImage} idx={index} setCurrentImage={props.setCurrentImage} />
        )}
      </div>

    </div>
  );
});

const Gallery = ((props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="gallery">
      <Image images={props.images} currentImage={currentImage} setCurrentImage={setCurrentImage} setIsLightboxOpen={setIsLightboxOpen}/>

      <div className={isLightboxOpen ? "lightbox show" : "lightbox"}>
        <div className="lightbox-content">
          <button className="close" onClick={() => setIsLightboxOpen(false)}>
            <img src={CloseIcon} alt="Close" width="20px" />
          </button>
          <Image images={props.images} currentImage={currentImage} setCurrentImage={setCurrentImage} setIsLightboxOpen={setIsLightboxOpen} />
        </div>
      </div>

    </div>
  );
});

export default Gallery;
