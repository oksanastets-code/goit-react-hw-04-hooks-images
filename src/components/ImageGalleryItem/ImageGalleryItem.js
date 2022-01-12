import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, tags, onSelect, largeImageURL }) {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onSelect(largeImageURL, tags)}
      />
    </GalleryItem>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
