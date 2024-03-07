import { nanoid } from "nanoid";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ data, onClose }) => {
  return (
    <>
      <ul className="ImageGallery">
        {data &&
          data.map((img) => (
            <ImageGalleryItem
              key={nanoid()}
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
              tags={img.tags}
              onClose={onClose}
            />
          ))}
      </ul>
    </>
  );
};

export default ImageGallery;
