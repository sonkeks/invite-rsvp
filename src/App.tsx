import './App.css'
import {Outlet} from "react-router";
import {Box, Card, CardContent, Typography} from "@mui/material";

function App() {

  return (
    <Box className="page">
      <Card sx={{ maxWidth: 500, marginBottom: "15px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Beisammensein nach der Beisetzung von Maik
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "15px", color: 'text.secondary' }}>
            Gemeinsam wollen wir an Maik denken und uns von ihm verabschieden.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "15px", color: 'text.secondary' }}>
            Die Beisetzung findet am <b>11.09.2025 um 13:00 Uhr im Friedwald Bernau</b> statt. Wir treffen uns ca. 30min vorher auf dem Parkplatz. Denkt an feste Schuhe und kleidet euch in euren Lieblingsfarben. Im Friedwald ist Grabschmuck nicht erlaubt. Es können kleine Zettel mit liebevollen Gedanken mit ins Grab gegeben werden.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "15px", color: 'text.secondary' }}>
            <b>Für eine Anwesenheit bei der Beisetzung ist keine Anmeldung notwendig.</b>
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "15px", color: 'text.secondary' }}>
            Wir bitten enge Freund*innen und Familie sich hier für das anschließende Beisammensein über das folgende Formular anzumelden.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Bitte gebt uns <b>bis zum 17.08.2025</b> über das folgende Formular eine Rückmeldung.
          </Typography>
        </CardContent>
      </Card>
      <Outlet />
    </Box>
  )
}

export default App
