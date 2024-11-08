import React from 'react';

const DemandeList = ({ demandes }) => {
  return (
    <div>
      <h2>List of Demandes</h2>
      <ul>
        {demandes.map((demande) => (
          <li key={demande.id}>
            <strong>Date de Dépôt:</strong> {demande.datedepot} <br />
            <strong>Date Prévus:</strong> {demande.dateprevu} <br />
            <strong>État:</strong> {demande.etat} <br />
            <strong>Symptôme:</strong> {demande.symptome} <br />
            <strong>Marque:</strong> {demande.marque} <br />
            <strong>Modèle:</strong> {demande.modele} <br />
            <strong>Série:</strong> {demande.serie} <br />
            <strong>Client:</strong> {demande.client} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DemandeList;
