import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DemandeForm = ({ onAddDemande }) => {
  const [formData, setFormData] = useState({
    datedepot: '',
    dateprevu: '',
    etat: '',
    symptome: '',
    marque: '',
    modele: '',
    serie: '',
    client: '',
  });
  
  const navigate = useNavigate(); // To navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDemande(formData); // Call the function passed from the parent (App)
    navigate('/list'); // Redirect to the list page after submitting the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date de Dépôt:</label>
        <input
          type="date"
          name="datedepot"
          value={formData.datedepot}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Prévus:</label>
        <input
          type="date"
          name="dateprevu"
          value={formData.dateprevu}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>État:</label>
        <input
          type="text"
          name="etat"
          value={formData.etat}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Symptôme:</label>
        <textarea
          name="symptome"
          value={formData.symptome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Marque:</label>
        <input
          type="text"
          name="marque"
          value={formData.marque}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Modèle:</label>
        <input
          type="text"
          name="modele"
          value={formData.modele}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Série:</label>
        <input
          type="text"
          name="serie"
          value={formData.serie}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Client:</label>
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit Demande</button>
    </form>
  );
};

export default DemandeForm;
