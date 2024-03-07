import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Button from "./components/Button";
import { getImagesApi } from "./services/api";
import { infoMessage, errorMessage } from "./services/toasts";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await getImagesApi(searchValue, page);
        if (!totalHits) {
          return infoMessage("Unfortunately, there are no more images with this name");
        }
        setImages((prevImages) => (prevImages.length !== 0 ? [...prevImages, ...hits] : hits));
        setTotal(totalHits);
      } catch (error) {
        errorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchValue !== "") {
      getImages();
    }
  }, [searchValue, page]);

  useEffect(() => {
    const checkLengthArr = () => {
      if (images.length !== total) {
        setShowButton(true);
      } else {
        infoMessage("Unfortunately, there are no more images with this name");
        setShowButton(false);
      }
    };

    if (images.length !== 0) {
      checkLengthArr();
    }
  }, [images.length, total]);

  const handleSearchSubmit = (value) => {
    setSearchValue(value);
    setImages([]);
    setPage(1);
    setShowButton(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const clearRender = () => {
    setSearchValue("");
    setShowButton(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} clearRender={clearRender} />
      {searchValue !== "" && <ImageGallery data={images} showButton={showButton} onClose={toggleModal} />}
      {showButton && <Button onLoadMore={handleLoadMore} />}
      {searchValue === "" && <p className="Text">Start search some images!</p>}
      {isLoading && <Loader />}
      {showModal && <Modal onClose={toggleModal} largeImageURL={largeImageURL} />}
      <ToastContainer />
    </div>
  );
};

export default App;
