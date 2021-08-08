import {
  Input,
  Button,
  Flex
} from '@chakra-ui/react'

import axios from 'axios';
import React, { FunctionComponent } from 'react';

import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { QueriesList } from '../components/QueriesList';
import { RecipesList } from '../components/RecipesList';

import { apiKey } from '../constants/configs';

const texts: Record<string, string> = {
  footer: 'Enjoy!',
  submit: 'submit',
  lastSearches: 'Last searches: '
};

const Index: FunctionComponent = () => {
  const [queryValue, setQueryValue] = useState<string>('');
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleQueryInputChange = (e) => setQueryValue(e.target.value);

  const submitQuery = () => {
    if (!queryValue) return;
    if (recentQueries.length >= 10) {
      recentQueries.pop();
    }
    setRecentQueries([queryValue, ...recentQueries]);
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${queryValue}`)
      .then((res) => setSearchResults(res.data.results))
      .catch((error) => console.log(error))
  };

  return (
    <Container>
      <Hero/>
      <Main>
        <Flex as='div' mb='6'>
          <Input
            value={queryValue}
            onChange={handleQueryInputChange}
            placeholder='Please enter query'
          />
          <Button
            width='100%'
            variant='solid'
            colorScheme='green'
            onClick={submitQuery}
            disabled={!queryValue}
          >
            {texts.submit}
          </Button>
        </Flex>
        {recentQueries.length &&
          <QueriesList
            data={recentQueries}
            setQuery={setQueryValue}
            setSearchResults={setSearchResults}
          />
        }
        <RecipesList data={searchResults}/>
      </Main>
      <DarkModeSwitch/>
      <Footer>
        {texts.footer}
      </Footer>
    </Container>
  );
};

export default Index;
