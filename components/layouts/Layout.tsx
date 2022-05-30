import React, { PropsWithChildren } from 'react';

import { Navbar } from '../ui';

import Head from 'next/head';


interface Props {
    title?:string;
    children?: React.ReactNode;
}

export const Layout:React.FC<PropsWithChildren<Props>>= ({ title, children}) => {

  const origin =(typeof window === 'undefined') ? '' : window.location.origin


  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name='author' content='Juan Lugo'/>
            <meta name='description' content={`Informacion sobre el pokemon ${title}`}/>
            <meta name='keywords' content={`${title},pokemon, pokedex`}/>
            
            <meta property="og:title" content={`Información sobre ${ title }`}/>
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />

        </Head>

        <Navbar/>

        <main style={{
            padding:'0px,20px'
        }}>
            {children}
        </main>
    </>
  )
}
