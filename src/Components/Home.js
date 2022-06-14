import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DialogFormulaire from "./DialogFormulaire";
function Home() {
  let location = useLocation();

  const [postesDeTravail, SetPostesDeTravail] = useState([
    {
      date_arrive: "2022-06-24",
      role: "Commercial",
      budget: 3000,
      pc_portable: "Oui",
      pc_fixe: "Non",
      ecran_supp: "Non",
      nbr_ecran: 1,
      station: "Non",
      smartphone: "Oui",
      tel_fixe: "Non",
      casque_sans_fil: "Oui",
      limite_budget: 0,
    },
  ]);

  useMemo(() => {
    console.log(location);
    if (location.state) {
      SetPostesDeTravail((oldPostes) => [...oldPostes, location.state]);
    }
  }, [location.state]);
  return (
    <>
      <Grid container rowSpacing={1}>
        {postesDeTravail.length > 0 &&
          postesDeTravail.map((item) => (
            <Grid item md={4}>
              <Card
                sx={{
                  width: 350,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    style={{
                      textAlign: "center",
                      marginLeft: 5,
                      color: "primary",
                    }}
                    gutterBottom
                  >
                    {item.role}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    date d'arrivé : {item.date_arrive}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    pc portable : {item.pc_portable}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    pc Fix : {item.pc_fixe}
                  </Typography>
                  {item.ecran_supp && (
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Nombre d'écran supplémentaire : {item.nbr_ecran} écrans
                    </Typography>
                  )}
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Smartphone : {item.smartphone}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Téléphone Fix : {item.tel_fixe}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Casque sans fil : {item.casque_sans_fil}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Station : {item.station}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: "/create",
                      state: item,
                    }}
                  >
                    <Button variant="outlined">Modifiez</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Home;
