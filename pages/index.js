import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from '@/styles/page.module.css';


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://api.txtropy.com/books')
  const jres = await res.json()
  const books = await JSON.parse(jres.body)
  // console.log(books);
  // Pass data to the page via props
  return { props: { books } }
}


export default function Page({ books }) {
  console.log(books);
  return (
    <React.Fragment>
      <CssBaseline />

      <main className={styles.layout}>

        <Box sx={{ paddingTop: 8 }}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Relative Entropy
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Quickly build an effective pricing table for your potential customers with this layout.
            It&apos;s built with default Material-UI components with little customization.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {books.map(tier => (
            <Grid item key={tier.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography><Box component="span" fontWeight='fontWeightBold'>{tier.title}</Box></Typography>
                  {tier.authors.map(author => (
                    <Typography key={`${tier.id}-${author}`} component="p">
                      {author}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  );
}