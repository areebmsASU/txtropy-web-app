import * as React from 'react';
import { useRouter } from 'next/router'

import styles from '@/styles/page.module.css';
import Drawer from './_components/drawer';
import Typography from '@mui/material/Typography';


export async function getServerSideProps(context) {
    const bookId = context.query.bookId;
    const res = await fetch(`https://5069kci2yd.execute-api.ca-central-1.amazonaws.com/prod/books/${bookId}?i=0`)
    const lines = await res.json()
    return { props: { lines } }
  }
   

function Page({ lines }) {
    return (
    <main>

        {lines.map(line => (
            <Typography variant="p" align="left" key={line.id} component="p">
                {line.text}
            </Typography>
                  ))}
        <Drawer/>

    </main>
  );
}

export default Page;