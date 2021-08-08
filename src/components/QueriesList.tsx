import { List, ListItem } from '@chakra-ui/layout';
import React, { CSSProperties, FunctionComponent } from 'react';
import axios from 'axios';

import { Recipe } from '../types/types';

import { apiKey } from '../constants/configs';

interface QueriesListProps {
  data: string[];
  setQuery: (query: string) => void;
  setSearchResults: (results: Recipe[]) => void;
}

const texts: Record<string, string> = {
  lastSearches: 'Last searches: '
};

const styles: Record<string, CSSProperties> = {
  queriesListWrapper: {
    marginTop: '10px'
  },
  queriesListItem: {
    cursor: 'pointer'
  }
};

export const QueriesList: FunctionComponent<QueriesListProps> = ({ data, setQuery, setSearchResults }) => {
  const handleRecentQueryClick = (e) => {
    setQuery(e.target.innerText);
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${e.target.innerText}`)
      .then((res) => setSearchResults(res.data.results))
      .catch((error) => console.log(error))
    ;
  };

  return (
    <>
      {texts.lastSearches}
      <List style={styles.queriesListWrapper}>
        {data.map((item: string) =>
          <ListItem style={styles.queriesListItem} onClick={handleRecentQueryClick}>
            {item}
          </ListItem>
        )}
      </List>
    </>
  )
};
