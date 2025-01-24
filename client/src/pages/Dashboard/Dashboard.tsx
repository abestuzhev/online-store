import {
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneElement } from 'react';
import NavBack from '../../components/NavBack';
import DashboardPanel from '../../components/DashboardPanel';

function Dashboard() {
  return (
    <div className="pageFull">
      <NavBack text="К каталогу" />
      <div className="pageTitle">
        <DashboardPanel />
      </div>
    </div>
  );
}

export default Dashboard;
