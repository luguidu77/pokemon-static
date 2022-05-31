import { useState } from "react";

import { Pokemon, PokemonListResponse} from "../../interfaces";

import { GetStaticProps,GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti'

import { Layout } from "../../components/layouts"
import { localFavorites } from "../../utils";
import { pokeApi } from "../../api";
import { getPokemonInfo } from '../../utils';




interface Props {
    pokemon: Pokemon
  }

const PokemonByNamePage:NextPage<Props> = ({ pokemon }) => {
    
  const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ))
  
  const onToggleFavorite =()=>{
   
    localFavorites.toggleFavorite( pokemon.id, pokemon.name )
    setIsInFavorites( !isInFavorites )

    if ( isInFavorites ) return

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 150,
      origin: {
        x: 1,
        y: 0}
    })
    
  }

  return  (
    <>
        <Layout title={ pokemon.name }>
          <Grid.Container css={{ marginTop: '5x' }} gap={ 2 }>
            <Grid xs={ 12 } sm={ 4 }>
              <Card hoverable css={{ padding: '30px'}}>
                <Card.Body>
                 <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={ pokemon.name}
                  width="100%"
                  height={ 200 }
                 />
                </Card.Body>
                 
              </Card>
            </Grid>

            <Grid xs={ 12 } sm={ 8 }>
              <Card>
                <Card.Header css={(outerWidth < 450) ?{ display: 'grid', justifyContent: 'space-between'}:{ display: 'flex', justifyContent: 'space-between'} }>
                  <Text h1 transform="capitalize" >
                    { pokemon.name }
                  </Text>

                  <Button 
                    onClick={ onToggleFavorite }
                    color='gradient' 
                    ghost= {!isInFavorites} 
                  >
                    
                    {isInFavorites? 'Eliminar de favoritos' : 'Guardar en favoritos'}
                  </Button>

                 </Card.Header>

                 <Card.Body>
                   <Text size={30}> Sprites: </Text>
                   <Container direction="row" display="flex">
                     <Image 
                      src={pokemon.sprites.front_default}
                      alt={ pokemon.name}
                      width={ 100 }
                      height={ 100 }
                     />
                     <Image 
                      src={pokemon.sprites.back_default}
                      alt={ pokemon.name}
                      width={ 100 }
                      height={ 100 }
                     />
                     <Image 
                      src={pokemon.sprites.front_shiny}
                      alt={ pokemon.name}
                      width={ 100 }
                      height={ 100 }
                     />
                     <Image 
                      src={pokemon.sprites.back_shiny}
                      alt={ pokemon.name}
                      width={ 100 }
                      height={ 100 }
                     />
                   </Container> 
                 </Card.Body>

              </Card>
            </Grid>

          </Grid.Container>
        
        </Layout>
    </>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // ARRAY DE STRING DEL 1 AL 151
     //const pokemon151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }`)
     const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
      
     const pokemonNames : string[] = data.results.map((pokemon) => pokemon.name)
      
     return {
       paths: pokemonNames.map( name =>(
         {
          params: { name : name } 
         }
        
       )), 
       fallback: false
     }
   }
   
   export const getStaticProps: GetStaticProps = async ({params}) => {
   
    const {name} = params as {name: string}

     return {
       props: {
        pokemon: await getPokemonInfo(name)
       }
     }
   }


export default PokemonByNamePage