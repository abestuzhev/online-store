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
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="pageFull">
      <NavBack text="К каталогу" />
      <div className="pageTitle">
        {/* <h2>Dashboard</h2> */}

        <DashboardPanel />
      </div>
    </div>
  );
}

export default Dashboard;
