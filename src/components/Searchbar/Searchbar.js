import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [keyWord, setKeyWord] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (keyWord.trim() === '') {
      const notify = 'Please, enter keyword for searching.';
      toast.error(notify);
      return;
    }
    onSubmit(keyWord);
    setKeyWord('');
    e.currentTarget.reset();
  };
  const handleKeyWordChange = e => {
    setKeyWord(e.currentTarget.value.toLowerCase());
  };
  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleKeyWordChange}
        />
      </SearchForm>
    </SearchBar>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
