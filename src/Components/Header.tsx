export const Header = () => {
    return <header>
    <div className="container">
    <a href="/" className="logo-link">
      <h1 className="logo">BookingService</h1>
    </a>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="listing.html">Listings</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="register.html">Register</a></li>
        </ul>
      </nav>
    </div>
  </header>
}