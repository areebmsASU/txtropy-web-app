import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import styles from "@/styles/page.module.css";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://api.txtropy.com/books");
  const jres = await res.json();
  const books = await JSON.parse(jres.body);
  return { props: { books } };
}

export default function Page({ books }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={styles.layout}>
        <Box sx={{ paddingTop: 8 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
          >
            Textropy
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Textropy is a portmanteau of the words <i>Text</i> and{" "}
            <i>Entropy</i>.{" "}
            <a href="https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence">
              Jensen-Shannon distance
            </a>{" "}
            has been used to find relations between the following books:
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {books.map((tier) => (
            <Grid item key={tier.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea href={`/books/${tier.id}`}>
                  <CardContent>
                    <Typography>
                      <Box component="span" fontWeight="fontWeightBold">
                        {tier.title}
                      </Box>
                    </Typography>
                      <Typography component="i">
                        {tier.author}
                      </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  );
}
