import {  Grid} from '@nextui-org/react';
import { FC } from 'react';
import { FavoriteCardPokemons } from './';

interface Props {
    pokemons: number[]
}

export const FavoritePokemons:FC<Props> = ({ pokemons }) => {
 

  return (
    <Grid.Container  gap={ 2 } direction= 'row' justify='flex-start'> 
       { 
            pokemons.map( id => (
               <FavoriteCardPokemons key={ id } pokemonId={ id } />
            ))
       }
    </Grid.Container>
  )
}
