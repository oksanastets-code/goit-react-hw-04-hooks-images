import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Div } from './App.styled';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

import LoadingDots from './components/Loader/Loader';
import Button from './components/Button/Button';
import { fetchImages } from './services/apiPixabay';

export default function App() {
  const [searchWord, setSearchWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  // fetchImages(searchWord, page)
  // .then(data => {
  //   if (data.hits.length === 0) {
  //     const notify = 'Wrong request - nothing found. Please, try again.';
  //     toast.error(notify);
  //     setShowLoadMoreBtn(false);
  //     // this.setState({ showLoadMoreBtn: false });
  //     return;
  //   }

  //   console.log(data.hits);
  //   setImages(prevImages => page === 1 ? data.hits : [...prevImages, ...data.hits]);
  //   setShowLoadMoreBtn(true);

  //   if (data.hits.length < 12) {
  //     setShowLoadMoreBtn(false);

  //   }
  //   return;
  // })
  // .catch(error => setError(error))
  // .finally(() => setLoading(false))

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  // end

  const handleFormSubmit = keyWord => {
    setSearchWord(keyWord);
  };
  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onOpenLargeImage = (selectedImage, selectedAlt) => {
    setModalImage(selectedImage);
    setModalAlt(selectedAlt);
    toggleModal();
  };

  return (
    <Div>
      <Toaster />
      <Searchbar onSubmit={handleFormSubmit} />
      {/* <LoadingDots /> */}
      {loading && <LoadingDots />}
      {images && <ImageGallery searchKey={searchWord} onOpen={onOpenLargeImage} images={images} />}
      {showLoadMoreBtn && <Button onClick={onLoadMoreClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={modalAlt} />
        </Modal>
      )}
    </Div>
  );
}

// start
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchWord !== this.state.searchWord) {
//       this.setState({
//         images: [],
//         page: 1,
//       });
//     }
//     if (prevProps.searchWord !== this.state.searchWord || prevState.page !== this.state.page) {
//       this.setState({
//         loading: this.state.page === 1 ? true : false,
//         showLoadMoreBtn: false,
//       });
// console.log(this.state.searchWord);
//       fetchImages(searchWord, page)
//         .then(data => {
//           if (data.hits.length === 0) {
//             const notify = 'Wrong request - nothing found. Please, try again.';
//             toast.error(notify);
//             this.setState({ showLoadMoreBtn: false });
//             return;
//           }

//           console.log(data.hits);
//           this.setState({
//             images: this.state.page === 1 ? data.hits : [...prevState.images, ...data.hits],
//             showLoadMoreBtn: true,
//           });
//           if (data.hits.length < 12) {
//             this.setState({ showLoadMoreBtn: false });
//           }
//           return;
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }
