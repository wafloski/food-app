import { List, ListItem } from "@chakra-ui/layout";
import React, {CSSProperties} from "react";
import axios from "axios";

import { apiKey } from '../constants/configs';

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

export const QueriesList = ({ data, queryValue, setQuery, setSearchResults }) => {
  const handleRecentQueryClick = (e) => {
    setQuery(e.target.innerText);
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${queryValue}`)
      .then((res) => setSearchResults(res.data.results))
      .catch((error) => console.log(error))
    ;
  };

  return (
    <>
      {texts.lastSearches}
      <List style={styles.queriesListWrapper}>
        {data.map((item) =>
          <ListItem style={styles.queriesListItem} onClick={handleRecentQueryClick}>
            {item}
          </ListItem>
        )}
      </List>
    </>
  )
};
