import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import "./index.css";
import MDInput from "components/MDInput";

/* eslint-disable */
function Interview() {
  const [searchInput, setSearchInput] = useState("");
  const [interviews, setInterviews] = useState([
    { id: 1, title: "Entretien 1", details: "Entretien pour le poste d'ingénieur en développement logiciel", company: "Entreprise A", address: "Adresse A", interviewType: "en face" },
    { id: 2, title: "Entretien 2", details: "Entretien pour le poste d'ingénieur en développement web", company: "Entreprise B", address: "Adresse B", interviewType: "en ligne" },

  ]);

  useEffect(() => {
    getInterviews();
  }, []);

  const getInterviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/interviews/getall");
      setInterviews(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des entretiens:", error);
    }
  };
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [interviewIdToDelete, setInterviewIdToDelete] = useState(null);

  const handleOpenConfirmation = (interviewId) => {
    setConfirmationOpen(true);
    setInterviewIdToDelete(interviewId);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setInterviewIdToDelete(null);
  };

  const handleDecline = () => {
    const updatedInterviews = interviews.filter((interview) => interview.id !== interviewIdToDelete);
    setInterviews(updatedInterviews);

    axios.delete(`http://localhost:5000/interviews/deleteintrv/${interviewIdToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Entretien supprimé avec succès");
        } else {
          throw new Error("Erreur lors de la suppression de l'entretien");
        }
      })
      .catch((error) => console.error("Erreur lors de la suppression de l'entretien:", error));

    handleCloseConfirmation();
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const filteredInterviews = interviews.filter((interview) =>{
  const titleMatch = interview.title.toLowerCase().includes(searchInput.toLowerCase())
  const descrInterMatch = interview.descrInter.toLowerCase().includes(searchInput.toLowerCase())
  return titleMatch || descrInterMatch;
});
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar searchInput={searchInput} onSearchInputChange={handleSearchInputChange}/>
      <MDBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h2" mb={7}>
              Vos entretiens
            </Typography>
            <Grid container spacing={2} mb={13}>
            {filteredInterviews.map((interview) => (
                <Grid item key={interview.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                    <Typography variant="h5">{interview.title}</Typography>
                      <Typography variant="h6" mt={2}>
                        <div className="interview-details">
                          <h4 className="red-text" style={{ textAlign: "center", marginBottom: "25px" }}>{interview.descrInter}</h4>
                          <p className="thin-text"><strong>Date :</strong>{interview.dateInterv}</p>
                          <p className="thin-text"><strong>Adresse :</strong>{interview.address}</p>
                          <p className="thin-text"><strong>Type d'entretien :</strong>{interview.typeIntrv}</p>
                          <p className="thin-text"><strong>Etat entretien :</strong>{interview.statusInterv}</p>
                        </div>
                      </Typography>
                      <div style={{ display: "flex", marginTop: "16px" }}>
                        <Button style={{ marginRight: "8px", color: 'red' }} onClick={() => handleOpenConfirmation(interview.id)}>
                          Décliner
                        </Button>
                        <Button style={{ color: 'red' }} onClick={() => console.log("Demander une autre date")}>
                          Autre date ?
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>

      <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Voulez-vous vraiment décliner cet entretien ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Non
          </Button>
          <Button onClick={handleDecline} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default Interview;
