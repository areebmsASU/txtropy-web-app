import * as React from 'react';
import { useRouter } from 'next/router'

import styles from '@/styles/page.module.css';
import Drawer from './_components/drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import { CoPresent } from '@mui/icons-material';




export async function getServerSideProps(context) {
    const bookId = context.query.bookId;
    const i = context.query.i;
    const res = await fetch(`https://api.txtropy.com/books/${bookId}?i=${i}`)
    const lines = await res.json()
    // const lines = [{"id": 0, "text": "The Project Gutenberg eBook of An Inquiry into the Nature and Causes of the Wealth of Nations"}, {"id": 1, "text": "    "}, {"id": 2, "text": "This ebook is for the use of anyone anywhere in the United States and"}, {"id": 3, "text": "most other parts of the world at no cost and with almost no restrictions"}, {"id": 4, "text": "whatsoever. You may copy it, give it away or re-use it under the terms"}, {"id": 5, "text": "of the Project Gutenberg License included with this ebook or online"}, {"id": 6, "text": "at www.gutenberg.org. If you are not located in the United States,"}, {"id": 7, "text": "you will have to check the laws of the country where you are located"}, {"id": 8, "text": "before using this eBook."}, {"id": 10, "text": "Title: An Inquiry into the Nature and Causes of the Wealth of Nations"}, {"id": 13, "text": "Author: Adam Smith"}, {"id": 15, "text": "Release date: June 1, 2002 [eBook #3300]"}, {"id": 16, "text": "                Most recently updated: December 29, 2021"}, {"id": 18, "text": "Language: English"}, {"id": 22, "text": "*** START OF THE PROJECT GUTENBERG EBOOK AN INQUIRY INTO THE NATURE AND CAUSES OF THE WEALTH OF NATIONS ***"}, {"id": 27, "text": "An Inquiry into the Nature and Causes of the Wealth of Nations"}, {"id": 31, "text": "by Adam Smith"}, {"id": 37, "text": "Contents"}, {"id": 40, "text": " INTRODUCTION AND PLAN OF THE WORK."}, {"id": 42, "text": " BOOK I. OF THE CAUSES OF IMPROVEMENT IN THE PRODUCTIVE"}, {"id": 43, "text": "POWERS OF LABOUR, AND OF THE ORDER ACCORDING TO WHICH ITS PRODUCE IS NATURALLY"}, {"id": 44, "text": "DISTRIBUTED AMONG THE DIFFERENT RANKS OF THE PEOPLE. "}, {"id": 45, "text": " CHAPTER I. OF THE DIVISION OF LABOUR."}, {"id": 46, "text": " CHAPTER II. OF THE PRINCIPLE WHICH GIVES OCCASION TO THE"}, {"id": 47, "text": "DIVISION OF LABOUR."}, {"id": 48, "text": " CHAPTER III. THAT THE DIVISION OF LABOUR IS LIMITED BY"}, {"id": 49, "text": "THE EXTENT OF THE MARKET."}, {"id": 50, "text": " CHAPTER IV. OF THE ORIGIN AND USE OF MONEY."}, {"id": 51, "text": " CHAPTER V. OF THE REAL AND NOMINAL PRICE OF"}, {"id": 52, "text": "COMMODITIES, OR OF THEIR PRICE IN LABOUR, AND THEIR PRICE IN MONEY."}]
    return { props: { lines } }
  }
   

function Page({ lines }) {
  
    const handleScroll = (e) => {
      if (typeof window !== "undefined") {
        console.log(`${10 > (document.body.offsetHeight - window.innerHeight - window.scrollY)}`);
      }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("Yes!");
  }
  }

  return (
      <Container >
    <Box onWheel={handleScroll} sx={{ width: 800, textAlign : "center" }} py={1}>

        {lines.map(line => (
      <Typography key={line.id}  >
              {line.text}
            </Typography>
                
                  ))}
    </Box>

    <Drawer/>
    </Container>

  );
}

export default Page;