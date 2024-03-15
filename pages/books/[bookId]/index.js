import { useRouter } from 'next/router';
import { useState, createElement } from 'react'; 
import Drawer from './_components/Drawer';
import TextWindow from './_components/TextWindow';
import Container from '@mui/material/Container';

import Head from 'next/head';


function mapToElements(htmlmap){
  
  if (htmlmap.attrs && "style" in htmlmap.attrs){
    const { style, ...attrs } = htmlmap.attrs;
    attrs["css"] = style;
    htmlmap.attrs = attrs;
  }

  if (htmlmap.contents) {
    const contents = htmlmap.contents.map(elem => { 
      if (typeof elem == "string") {
        return elem;
      } else {
        return mapToElements(elem);
      }
    })

    htmlmap.tag = htmlmap.tag == "body" ? "div" : htmlmap.tag

    const newElem = createElement(htmlmap.tag, htmlmap.attrs, ...contents)
    return newElem;
  } else {
    const newElem = createElement(htmlmap.tag, htmlmap.attrs)
    return newElem;
  } 
}
   

export async function getServerSideProps(context) {
    const bookId = context.query.bookId;
    const res = await fetch(`https://api.txtropy.com/books/${bookId}`);
    const htmlmap = await res.json();
    
    return { props: { htmlmap } }
  }

function Page({ htmlmap }) {
  const router = useRouter()
  const bookId = router.query.bookId;

  //         <Drawer />     
  // console.log(htmlmap);
  return (
    <Container >
      <Head>
        <link rel="stylesheet" href={`https://api.txtropy.com/books/css/${bookId}`} type="text/css"/>
      </Head>
        {mapToElements(htmlmap)}
    </Container>

  );
}

export default Page;