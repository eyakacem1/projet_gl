import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient, updateClient, fetchClientById } from '../../api/clientAPI';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    adress: '',
    numtel: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadClient = async () => {
        const client = await fetchClientById(id);
        setFormData(client);
      };
      loadClient();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update existing client
      await updateClient(id, formData);
    } else {
      // Add new client
      await createClient(formData);
    }
    navigate('/gestion-client'); // Redirect to client list page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
      />
      <input
        type="text"
        name="adress"
        placeholder="Adresse"
        value={formData.adress}
        onChange={handleChange}
      />
      <input
        type="text"
        name="numtel"
        placeholder="Numéro de téléphone"
        value={formData.numtel}
        onChange={handleChange}
      />
      <button type="submit">{id ? 'Mettre à jour' : 'Ajouter'} Client</button>
    </form>
  );
};

export default ClientForm;
