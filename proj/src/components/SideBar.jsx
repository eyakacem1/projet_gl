import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/gestion-client">Gestion Client</Link></li>
        <li><Link to="/gestion-demande">Gestion Demande</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;
