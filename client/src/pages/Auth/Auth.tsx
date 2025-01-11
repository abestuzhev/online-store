import NavBack from "../../components/NavBack";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";


function Auth() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div className="pageLayout">
      <NavBack text="К категориям" />
      <div className="pageTitle">
        <h2>Заголовк</h2>
      </div>


    </div>
  );
}

export default Auth;
