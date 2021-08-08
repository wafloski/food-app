import { Flex, List, ListItem } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import React, { CSSProperties, FunctionComponent } from 'react';

import { Recipe } from '../types/types';

interface RecipesListProps {
  data: Recipe[];
}

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

export const RecipesList: FunctionComponent<RecipesListProps> = ({ data }) => (
  <Flex as='div'>
    <List style={styles.recipesListWrapper}>
      {data.map((item: Recipe) =>
        <ListItem style={styles.recipesListItem}>
          <Image
            objectFit='cover'
            src={item.image}
            alt={item.title}
            mb='4'
          />
          {item.title}
        </ListItem>
      )}
    </List>
  </Flex>
);