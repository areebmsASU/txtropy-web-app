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
  const res = await fetch('https://5069kci2yd.execute-api.ca-central-1.amazonaws.com/prod/books')
  const books = await res.json()
  // Pass data to the page via props
  return { props: { books } }
}


export default function Page({ books }) {

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
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  // subheaderTypographyProps={{ align: 'center' }}
                  className={styles.cardHeader}
                />
                <CardContent>
                  {tier.authors.map(author => (
                    <Typography variant="h5" align="center" key={author} component="p">
                      {author}
                    </Typography>
                  ))}
                  {tier.subjects.map(subject => (
                    <Typography variant="p" align="center" key={subject} component="p">
                      {subject}
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