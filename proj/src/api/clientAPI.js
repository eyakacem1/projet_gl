// src/components/API/clientAPI.js

const mockClients = [
    { id: 1, nom: 'Client 1', adress: '123 Street', numtel: '123-456-789' },
    { id: 2, nom: 'Client 2', adress: '456 Avenue', numtel: '987-654-321' },
    { id: 3, nom: 'Client 3', adress: '789 Boulevard', numtel: '555-666-777' },
  ];
  
  export const fetchClients = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClients);
      }, 1000); // Simulate a network delay of 1 second
    });
  };
  
  export const deleteClient = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 1000); // Simulate a network delay of 1 second
    });
  };
  