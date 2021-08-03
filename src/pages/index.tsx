import {
  Input,
  Link as ChakraLink,
  Text,
  List,
  ListIcon,
  ListItem,
  Button,
  Stack,
  Image,
  Flex,
  Box
} from '@chakra-ui/react'

import axios from 'axios';
import React, { CSSProperties } from 'react';

import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { useState } from 'react';

const apiKey: string = 'd561dda8623e470b971a46b1e4b102f4';

const texts: Record<string, string> = {
  footer: 'Enjoy!',
  submit: 'submit',
  lastSearches: 'Last searches'
};

const styles: Record<string, CSSProperties> = {
  recipesListWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  recipesListItem: {
    width: '33.3333%',
    marginBottom: '30px',
    padding: '10px'
  }
};

const Index = () => {
  const [queryValue, setQueryValue] = useState<string>('');
  const [recentQueries, setRecentQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const handleQueryInputChange = (e) => setQueryValue(e.target.value);
  const submitQuery = () => {
    if (!queryValue) return;
    if (recentQueries.length >= 10) {
      recentQueries.pop();
    }
    setRecentQueries([queryValue, ...recentQueries]);
    // axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${queryValue}`)
    //   .then((res) => console.log(res)
    // );
  };

  const handleRecentQueryClick = (e) => {
    setQueryValue(e.target.innerText);
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${queryValue}`)
      .then((res) => setSearchResults(res.data.results))
      .catch((error) => console.log(error))
    ;
    console.log(searchResults);
  };

  const QueriesList = () => (
    <List>
      {recentQueries.map((item) =>
        <ListItem onClick={handleRecentQueryClick}>
          {item}
        </ListItem>)}
    </List>
  );

  const RecipesList = () => (
    <Flex as='div'>
      <List style={styles.recipesListWrapper}>
        {searchResults.map((item) =>
          <ListItem style={styles.recipesListItem}>
            <Image
              objectFit="cover"
              src={item.image}
              alt={item.title}
            />
            {item.title}
          </ListItem>
        )}
      </List>
    </Flex>
  );

  return (
    <Container>
      <Hero/>
      <Main>
        <Flex as='div'>
          <Input
            value={queryValue}
            onChange={handleQueryInputChange}
            placeholder='Please enter query'
          />
          <Button
            width="100%"
            variant="solid"
            colorScheme="green"
            onClick={submitQuery}
            disabled={!queryValue}
          >
            {texts.submit}
          </Button>
        </Flex>
        <QueriesList />
        <RecipesList />
      </Main>
      <DarkModeSwitch/>
      <Footer>
        {texts.footer}
      </Footer>
    </Container>
  );
};

export default Index
