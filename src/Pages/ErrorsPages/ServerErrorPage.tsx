import { Header } from '../../Components/Common/Header';
import { Footer } from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './ServerErrorPageStyle.css';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="server-error-page">
      <Header />
      <main className="error-container">
        <div className="error-content">
          <h1>Oops! Something went wrong.</h1>
          <p>
            We're unable to connect to the server at the moment. Please try again later.
          </p>
          <button className="btn-primary" onClick={goHome}>
            Go Home
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServerErrorPage;