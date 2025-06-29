import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 0 20px;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 14px 20px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    outline: none;
    border-color: #1DB954;
    box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(29, 185, 84, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #b3b3b3;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 14px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  loading = false, 
  placeholder = "アーティスト名やアルバム名で検索..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
        />
        <SearchButton type="submit" disabled={loading || !query.trim()}>
          {loading ? '検索中...' : '検索'}
        </SearchButton>
        {query && (
          <ClearButton type="button" onClick={handleClear}>
            クリア
          </ClearButton>
        )}
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;