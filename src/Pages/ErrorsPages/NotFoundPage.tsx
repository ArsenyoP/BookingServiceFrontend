import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Common/Header";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="server-error-page">
      <Header />
      <main className="error-container">
        <div className="error-content">
          <h1>Error 404. Can't find content.</h1>
          <button className="btn-primary" onClick={goHome}>
            Go Home
          </button>
        </div>
      </main>
    </div>
  );
};