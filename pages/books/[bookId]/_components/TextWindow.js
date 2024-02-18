"use client";

import { useEffect, useState } from 'react'; 
import { useParams } from 'next/navigation'


import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
 

function TextWindow({ lines, setLines }) {
    const params = useParams();
    const [fetching, setFetching]  = useState(false);
  
    const Y_LOAD = 300;

    useEffect(() => {
      if (fetching) {
        const i = lines.slice(-1).pop().id + 1;
        fetch(`https://api.txtropy.com/books/${params.bookId}?i=${i}`).then(res => res.json()).then(newLines=>{
          console.log(newLines);
          setLines(lines => {return [...lines, ...newLines]});
        });
      }
    }, [fetching])
    

    useEffect(() => {
      const onScroll = () => setFetching(((document.body.offsetHeight) - (window.scrollY + window.innerHeight)) < Y_LOAD);

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


  return (
        <Box sx={{ width: 800, textAlign : "center" }} py={1}>
          {lines.map(line => (
            <Typography key={line.id}>{line.text}</Typography>
          ))}
        </Box>
  );
}

export default TextWindow;