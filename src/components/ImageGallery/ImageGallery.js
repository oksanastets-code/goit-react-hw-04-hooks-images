import { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoadingDots from '../Loader/Loader';
import Button from '../Button/Button';
import { GalleryList } from './ImageGallery.styled';
import { fetchImages } from '../../services/apiPixabay';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    error: null,
    showLoadMoreBtn: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchKey !== this.props.searchKey) {
      this.setState({
        images: [],
        page: 1,
      });
    }
    if (prevProps.searchKey !== this.props.searchKey || prevState.page !== this.state.page) {
      this.setState({
        loading: this.state.page === 1 ? true : false,
        showLoadMoreBtn: false,
      });

      fetchImages(this.props.searchKey, this.state.page)
        .then(data => {
          if (data.hits.length === 0) {
            const notify = 'Wrong request - nothing found. Please, try again.';
            toast.error(notify);
            this.setState({ showLoadMoreBtn: false });
            return;
          }

          console.log(data.hits);
          this.setState({
            images: this.state.page === 1 ? data.hits : [...prevState.images, ...data.hits],
            showLoadMoreBtn: true,
          });
          if (data.hits.length < 12) {
            this.setState({ showLoadMoreBtn: false });
          }
          return;
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, showLoadMoreBtn } = this.state;
    return (
      <>
        {loading && <LoadingDots />}
        {images && (
          <GalleryList>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                tags={image.tags}
                largeImageURL={image.largeImageURL}
                onSelect={this.props.onOpen}
              />
            ))}
          </GalleryList>
        )}
        {showLoadMoreBtn && <Button onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
GalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
