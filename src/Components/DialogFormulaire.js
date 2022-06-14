import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Link, useLocation } from "react-router-dom";

function DialogFormulaire() {
  let location = useLocation();
  const [itemToEdit, setitemToEdit] = useState({});

  useMemo(() => {
    if (location.state) {
      setitemToEdit(location.state);
      console.log(itemToEdit);
    }
  }, [location.state]);
  const [open, setOpen] = React.useState(false);
  const [etape, setEtape] = useState(0);
  const [object, setObject] = useState({
    date_arrive: location.state ? location.state.date_arrive : "2022-06-24",
    role: location.state ? location.state.role : "",
    budget: location.state ? location.state.budget : "",
    pc_portable: location.state ? location.state.pc_portable : "Non",
    pc_fixe: location.state ? location.state.pc_fixe : "Non",
    ecran_supp: location.state ? location.state.ecran_supp : "Non",
    nbr_ecran: location.state ? location.state.nbr_ecran : 1,
    station: location.state ? location.state.station : "Non",
    smartphone: location.state ? location.state.smartphone : "Non",
    tel_fixe: location.state ? location.state.tel_fixe : "Non",
    casque_sans_fil: location.state ? location.state.casque_sans_fil : "Non",
    limite_budget: location.state ? location.state.limite_budget : 0,
  });
  const res = useMemo(() => {
    if (object.role === "Développeur") {
      setObject({ ...object, limite_budget: 3000, budget: 0 });
    }
    if (object.role === "Commercial") {
      setObject({
        ...object,
        pc_portable: "Oui",
        smartphone: "Oui",
        pc_fixe: "Non",
        tel_fixe: "Non",
        limite_budget: 3000,
        budget: 0,
      });
    } else if (object.role === "Trader") {
      setObject({
        ...object,
        pc_fixe: "Oui",
        pc_portable: "Non",
        nbr_ecran: 3,
        ecran_supp: "Oui",
        limite_budget: 0,
        budget: 0,
      });
    }
  }, [object.role]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange1 = (newValue) => {
    setObject({ ...object, date_arrive: newValue });
  };
  const handleChange2 = (e) => {
    setObject({ ...object, role: e.target.value });
  };
  const handleChange3 = (e) => {
    setObject({ ...object, pc_portable: e.target.value });
  };
  const handleChange4 = (e) => {
    setObject({ ...object, pc_fixe: e.target.value });
  };
  const handleChange5 = (e) => {
    setObject({ ...object, station: e.target.value });
  };
  const handleChange6 = (e) => {
    setObject({ ...object, ecran_supp: e.target.value });
  };
  const handleChange7 = (e) => {
    setObject({ ...object, nbr_ecran: e.target.value });
  };
  const handleChange8 = (e) => {
    setObject({ ...object, smartphone: e.target.value });
  };
  const handleChange9 = (e) => {
    setObject({ ...object, tel_fixe: e.target.value });
  };
  const handleChange10 = (e) => {
    setObject({ ...object, casque_sans_fil: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {location.state ? "Modifiez" : "Ajoutez"} un poste de travail
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Création d'un poste de travaill</DialogTitle>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ textAlign: "center", color: "green" }}
        >
          Budget Max : {""}
          {object.limite_budget === 0
            ? "pas de limite de budget"
            : object.limite_budget + "euro"}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ textAlign: "center", color: "red" }}
        >
          Reste a Depenser : {object.limite_budget - object.budget} euro
        </Typography>

        <DialogContent>
          {etape === 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Séléctionnez le jour d'arrivée du nouvel employé :
              </Typography>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={object.date_arrive}
                onChange={(e) => handleChange1(e.target.value)}
                sx={{ width: 220 }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <Button variant="outlined" onClick={() => setEtape(1)}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 1 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Séléctionnez le role de l'employé :
              </Typography>
              <FormControl fullWidth>
                <Select value={object.role} onChange={handleChange2}>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Trader">Trader</MenuItem>
                  <MenuItem value="Développeur">Développeur</MenuItem>
                </Select>
              </FormControl>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(0);
                  }}
                >
                  Précedent
                </Button>
                <Button variant="outlined" onClick={() => setEtape(2)}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 2 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                ordinateur portable à 1800€ (1 maximum par personne)
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://img.phonandroid.com/2022/01/pc-portable.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.pc_portable}
                    onChange={handleChange3}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={
                        (object.pc_portable === "Oui" &&
                          object.role === "Commercial") ||
                        object.role === "Trader"
                      }
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={
                        (object.pc_portable === "Oui" &&
                          object.role === "Commercial") ||
                        object.role === "Trader"
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(1);
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.pc_portable === "Oui") {
                      setEtape(4);
                      setObject({ ...object, budget: 1800 });
                      object.budget = 1800;
                    } else {
                      setObject({ ...object, pc_fixe: "Oui" });
                      setEtape(3);
                    }
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 3 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Ordinateur fixe + écran 2200€ (1 maximum par personne)
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://www.jardin-internet.fr/9046-large_default/ordinateur-fixe-apple-imac-215-pouces-a1311-ref-w81121r2db7.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.pc_fixe}
                    onChange={handleChange4}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={
                        object.pc_portable === "Non" || object.pc_fixe === "Oui"
                      }
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={
                        object.pc_portable === "Non" || object.pc_fixe === "Oui"
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(2);
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.pc_fixe === "Oui") {
                      setObject({ ...object, budget: 2200 });
                    }
                    setEtape(5);
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 4 && object.pc_portable === "Oui" && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                station d’accueil d’ordinateur portable 400€ (1 maximum par
                personne)
              </Typography>
              {object.role === "Commercial" && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  gutterBottom
                  style={{ marginBottom: 10 }}
                >
                  Vous pouvez choisir soit une station d'acceuil d'ordinateur
                  portable ou bien un écran supplémentaire (Cliquez sur suivant)
                </Typography>
              )}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://www.cdiscount.com/pdt2/2/3/4/1/1200x1200/mac5902211119234/rw/station-d-accueil-ordinateur-portable-mctv-850-11e.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.station}
                    onChange={handleChange5}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(2);
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.station === "Oui") {
                      setObject({ ...object, budget: object.budget + 400 });
                      setEtape(6);
                    } else {
                      setEtape(5);
                    }
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 5 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                écran supplémentaire avec socle de fixation 250€ (3 maximum par
                personne)
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://i0.wp.com/teletravailfacile.fr/wp-content/uploads/2020/11/71njZaURxsL._AC_SL1500_.jpg?fit=1024%2C1024&ssl=1"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.ecran_supp}
                    onChange={handleChange6}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={
                        (object.ecran_supp === "Oui" &&
                          object.role === "Trader") ||
                        object.limite_budget - object.budget < 250
                      }
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={
                        (object.ecran_supp === "Oui" &&
                          object.role === "Trader") ||
                        object.limite_budget - object.budget < 250
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {object.ecran_supp === "Oui" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography>Choissisez le nombre d'écran :</Typography>
                  <Select
                    value={object.nbr_ecran}
                    style={{ height: "30px" }}
                    onChange={handleChange7}
                    disabled={
                      object.nbr_ecran === 3 && object.role === "Trader"
                    }
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem
                      disabled={object.limite_budget - object.budget < 500}
                      value={2}
                    >
                      2
                    </MenuItem>
                    <MenuItem
                      disabled={object.limite_budget - object.budget < 750}
                      value={3}
                    >
                      3
                    </MenuItem>
                  </Select>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    if (object.pc_portable === "Oui") {
                      setEtape(4);
                    } else {
                      setEtape(3);
                    }
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.ecran_supp === "Oui") {
                      setObject({
                        ...object,
                        budget: object.budget + object.nbr_ecran * 250,
                      });
                    }
                    setEtape(6);
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 6 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Smartphone 600 euro
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://www.iphon.fr/app/uploads/2021/09/iphone-13-pro-max-fiche-technique.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.smartphone}
                    onChange={handleChange8}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={
                        (object.smartphone === "Oui" &&
                          object.role === "Commercial") ||
                        object.limite_budget - object.budget < 600
                      }
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={
                        (object.smartphone === "Oui" &&
                          object.role === "Commercial") ||
                        object.limite_budget - object.budget < 600
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(5);
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.smartphone === "Oui") {
                      setObject({
                        ...object,
                        budget: object.budget + 600,
                      });
                      setEtape(8);
                    } else {
                      setObject({ ...object, tel_fixe: "Oui" });
                      setEtape(7);
                    }
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 7 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Téléphone fixe 100 euro
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://static.fnac-static.com/multimedia/Images/FR/MDM/51/c0/e6/15122513/1505-1/tsp20220426170434/Telephone-fixe-sans-fil-Gigaset-A700A-Noir.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.tel_fixe}
                    onChange={handleChange9}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={
                        object.smartphone === "Non" ||
                        object.limite_budget - object.budget < 100
                      }
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={
                        object.smartphone === "Non" ||
                        object.limite_budget - object.budget < 100
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setEtape(6);
                  }}
                >
                  Précedent
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (object.tel_fixe === "Oui") {
                      setObject({
                        ...object,
                        budget: object.budget + 100,
                      });
                    }
                    setEtape(8);
                  }}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
          {etape === 8 && (
            <div>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                style={{ marginBottom: 10 }}
              >
                Casque sans fil 250 euro
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://media.conforama.fr/m/export/Medias/700000/20000/6000/500/50/G_726550_A.jpg"
                  alt="pc portable"
                  style={{
                    border: 1,
                    borderRadius: "20%",
                    maxWidth: "100%",
                    height: "300px",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={object.casque_sans_fil}
                    onChange={handleChange10}
                    row
                  >
                    <FormControlLabel
                      value="Oui"
                      control={<Radio />}
                      label="Oui"
                      disabled={object.limite_budget - object.budget < 250}
                    />
                    <FormControlLabel
                      value="Non"
                      control={<Radio />}
                      label="Non"
                      disabled={object.limite_budget - object.budget < 250}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    if (object.smartphone === "Oui") {
                      setEtape(6);
                    } else {
                      setEtape(7);
                    }
                  }}
                >
                  Précedent
                </Button>

                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/",
                    state: object,
                  }}
                >
                  <Button variant="outlined">Validez</Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogFormulaire;
