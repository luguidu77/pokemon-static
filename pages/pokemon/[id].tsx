import { useState } from 'react';

import { GetStaticProps,GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti'

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts"
import { Pokemon} from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";


let pantalla: number

   if (typeof window === 'undefined'){
     null
   } else {
     pantalla = window.screen.width
     console.log(pantalla);
     
   }

 interface Props {
    pokemon: Pokemon
  }

const PokemonPage:NextPage<Props> = ({pokemon}) => {


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
   
  
  
  

  return (
    <>
        <Layout title={ pokemon.name }>
          <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
            <Grid xs={ 4 } sm={ 4 }>
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

            <Grid xs={ 8 } sm={ 8 }>
              <Card>
              <Card.Header css={
                  
                  ( pantalla < 450) ?{ display: 'grid', justifyContent: 'space-between'}:{ display: 'flex', justifyContent: 'space-between'} 
               
               }>
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
 // ARRAY DE STRING DEL 1 AL 151
  const pokemon151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }`)
 

  return {
    paths: pokemon151.map( id =>({
      params: { id : id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {id} = params as {id: string}
 

  return {
    props: {
     pokemon:  await getPokemonInfo(id)
    }
  }
}

export default PokemonPage