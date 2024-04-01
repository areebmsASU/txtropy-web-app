import { useRouter } from "next/router";
import { useState, createElement, useRef, useEffect } from "react";
import Drawer from "./_components/Drawer";
import TextWindow from "./_components/TextWindow";
import Container from "@mui/material/Container";

import Head from "next/head";


function BookText(htmlmap, chunkRefs){

  if (htmlmap.attrs && "data-txtrpy-id" in htmlmap.attrs){
    htmlmap.attrs.ref = useRef();
    chunkRefs.current[htmlmap.attrs["data-txtrpy-id"]] = htmlmap.attrs.ref;
  }
 
  if (htmlmap.attrs && "style" in htmlmap.attrs){
    const { style, ...attrs } = htmlmap.attrs;
    attrs["css"] = style;
    htmlmap.attrs = attrs;
  }

  if (htmlmap.contents) {
    const contents = htmlmap.contents.map((elem) => {
      if (typeof elem == "string") {
        return elem;
      } else {
        return BookText(elem, chunkRefs);
      }
    })
    //isVisible && console.log(htmlmap.attrs)}

    return createElement(htmlmap.tag, htmlmap.attrs, ...contents);
  } else {
    return createElement(htmlmap.tag, htmlmap.attrs);
  } 
}

export async function getStaticPaths() {
  const res = await fetch("https://api.txtropy.com/books");
  const jres = await res.json();
  const books = await JSON.parse(jres.body);
  const paths = books.map((book) => ({
    params: { bookId: `${book.id}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.txtropy.com/books/${params.bookId}`);
  const htmlmap = await res.json();

  return { props: { htmlmap } };
}

function Page({ htmlmap }) {
  const router = useRouter();
  const bookId = router.query.bookId;
  const chunkRefs = useRef({});
  const [chunkIds, setChunkIds] = useState([])

  useEffect(() => {
      const onScroll = () => {
        Object.values(chunkRefs.current).map(r=>r.current.style.color="grey");

        let onScreenChunks = Object.values(chunkRefs.current).filter(r => (r.current.getBoundingClientRect().y < 0.8*window.innerHeight) && (r.current.getBoundingClientRect().y > 0));

        for (let i = 0; i < onScreenChunks.length; i++) {
            onScreenChunks[i].current.style.color = "black";
        }

        setChunkIds(
          onScreenChunks.map(r => r.current.getAttribute("data-txtrpy-id"))
        )      
    
    };     

      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Container>
      <Head>
      <link
          rel="stylesheet"
          href={`https://api.txtropy.com/books/css/${bookId}`}
          type="text/css"
        />
      </Head>
      
        {BookText(htmlmap, chunkRefs)}
      
      {/*<Drawer chunkIds={chunkIds} />*/}
      </Container>
  );
}

export default Page;
