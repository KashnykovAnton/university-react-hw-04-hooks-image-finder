import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Button from './components/Button';
import { getImagesApi } from './services/api';
import { infoMessage, errorMessage } from './services/toasts';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (value === '') return;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await getImagesApi(value, page);
        if (!totalHits) {
          setShowButton(false);
          return infoMessage(
            'Unfortunately, there are no more images with this name'
          );
        }
        setImages(prevImages =>
          prevImages.length !== 0 ? [...prevImages, ...hits] : hits
        );
        if (page === Math.ceil(totalHits / 12)) {
          setShowButton(false);
          return infoMessage(
            'Unfortunately, there are no more images with this name'
          );
        }
        setShowButton(true);
      } catch (error) {
        errorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [value, page]);

  const handleSearchSubmit = searchValue => {
    setValue(searchValue);
    setImages([]);
    setPage(1);
    setShowButton(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const clearRender = () => {
    setValue('');
    setShowButton(false);
    setImages([]);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} clearRender={clearRender} />
      {images.length > 0 && (
        <ImageGallery
          data={images}
          showButton={showButton}
          onClose={toggleModal}
        />
      )}
      {value === '' && <p className="Text">Start search some images!</p>}
      {showButton && <Button onLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
