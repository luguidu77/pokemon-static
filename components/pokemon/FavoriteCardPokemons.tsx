
import { FC } from 'react';
import { Text, Grid, Card, Row } from '@nextui-org/react';
import { useRouter } from 'next/router';


interface Props {
   pokemonId : number
}

export const FavoriteCardPokemons:FC<Props> = ({ pokemonId }) => {


  const router = useRouter()

  const onFavoriteClicked = ()=> {
      router.push(`/pokemon/${ pokemonId }`)
  }

  return (
    
        
          <Grid xs={ 12 } sm={ 3 } xl={ 1 } key={ pokemonId }>
            <Card hoverable clickable css={{ padding: 10}}   onClick={ onFavoriteClicked }>
              <Card.Image 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                width={'100%'}
                height={ 140 }
              />

              <Card.Footer>
                <Row justify='space-between'>
                  <Text> {pokemonId}</Text>
                  <Text transform='capitalize'> {localStorage.getItem(`${pokemonId}`)}</Text>
                </Row>
                
              </Card.Footer>
                
            
              
            </Card>
          </Grid>
      

        
      
  )
}
