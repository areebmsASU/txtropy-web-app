import { useState } from 'react'; 

import Drawer from './_components/Drawer';
import TextWindow from './_components/TextWindow';
import Container from '@mui/material/Container';

export async function getServerSideProps(context) {
    const bookId = context.query.bookId;
    const res = await fetch(`https://api.txtropy.com/books/${bookId}`)
    const initialLines = await res.json()
    return { props: { initialLines } }
  }
   

function Page({ initialLines }) {
  const [lines, setLines] = useState(initialLines);
  return (
      <Container >
        <TextWindow lines={lines} setLines={setLines} />
        <Drawer chunkIds={lines.map(line => Math.floor(line.id/3)).filter((x, i, a) => a.indexOf(x) === i)}/>
    </Container>

  );
}

export default Page;