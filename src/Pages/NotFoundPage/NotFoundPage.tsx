import { Header } from "../../Components/Common/Header";

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>404 - Page Not Found</h1>
        <p>The requested listing could not be found.</p>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2026 BookingService. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};