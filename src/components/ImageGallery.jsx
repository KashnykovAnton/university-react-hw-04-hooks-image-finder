import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ data, onClose }) => {
  return (
    <>
      <ul className="ImageGallery">
        {data.map(img => (
          <ImageGalleryItem
            key={img.id}
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
