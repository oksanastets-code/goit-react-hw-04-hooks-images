import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Div } from './App.styled';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

export default class App extends Component {
  state = {
    searchWord: '',
    showModal: false,
    modalImage: null,
    modalAlt: null,
  };

  handleFormSubmit = keyWord => {
    this.setState({ searchWord: keyWord });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenLargeImage = (selectedImage, selectedAlt) => {
    this.setState({ modalImage: selectedImage, modalAlt: selectedAlt });
    this.toggleModal();
  };

  render() {
    const { showModal, modalImage, modalAlt, showLoadMoreBtn } = this.state;
    return (
      <Div>
        <Toaster />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchKey={this.state.searchWord} onOpen={this.onOpenLargeImage} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt={modalAlt} />
          </Modal>
        )}
      </Div>
    );
  }
}
