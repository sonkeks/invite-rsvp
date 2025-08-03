import {type ChangeEvent, type FormEvent, type FunctionComponent, useEffect, useState} from "react";
import {Box, Button, FormControl, InputLabel, Select, TextField, MenuItem, Stack, Alert, Collapse} from "@mui/material";

export const Home: FunctionComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    plusOnes: 0,
  });
  
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  
  const [responseType, setResponseType] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      plusOnes: parseInt(e.target.value, 10),
    }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Use FormData instead of JSON to avoid preflight
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('plusOnes', formData.plusOnes.toString());
      formDataToSend.append('response', responseType + "");
      
      const response = await fetch("https://script.google.com/macros/s/AKfycby1612RaNikmlde7YX92s-StHOeknY5_lUoWvrcLcWYKTWHY9cp4N-8rgRzDcHHzh7P/exec", {
        method: 'POST',
        body: formDataToSend,
        // Remove headers and credentials to avoid preflight
      });
      
      if (response.ok) {
        setFormData({ firstName: "", lastName: "", plusOnes: 0 });
        setAlert({ type: "success", message: "Erfolgreich übermittelt!" });
      } else {
        setAlert({ type: "error", message: "Übermittlung fehlgeschlagen." });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Fehler bei der Übermittlung." });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 8000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);
  
  
  return (
    <div>
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <TextField
        label="Vorname"
        name="firstName"
        value={formData.firstName}
        onChange={handleTextChange}
        required
      />
      <TextField
        label="Nachname"
        name="lastName"
        value={formData.lastName}
        onChange={handleTextChange}
        required
      />
      <FormControl required>
        <InputLabel id="plusOnes-label">Weitere Teilnehmer*innen</InputLabel>
        <Select
          labelId="plusOnes-label"
          name="plusOnes"
          value={formData.plusOnes}
          onChange={handleSelectChange}
          label="Weitere Teilnehmer:innen"
        >
          {[...Array(11).keys()].map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" gap="15px">
        <Box flex="1"></Box>
        <Button size="large" loading={isLoading && responseType} disabled={isLoading} onClick={() => setResponseType(true)} color="success" variant="contained" type="submit">
          Zusagen
        </Button>
        <Button size="large" loading={isLoading && !responseType} disabled={isLoading} onClick={() => setResponseType(false)} color="error" variant="outlined" type="submit">
          Absagen
        </Button>
      </Stack>
    </Box>
    <Collapse sx={{marginTop: "15px"}} in={!!alert}>
      {alert && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert(null)}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}
    </Collapse>
    </div>
  )
}
