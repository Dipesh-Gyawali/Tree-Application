import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  // const [searchData, setSearchData] = useState("");

  // const handleChange = (e) => {
  //   setSearchData(e.target.value);
  // };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ background: "cornflowerblue" }}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link">
                All Profiles
              </Link>
            </li>
          </ul>
        </div>

        {/* <input
          className="search "
          type="search"
          placeholder="Search"
          onChange={handleChange}
        ></input> */}
      </div>
    </nav>
  );
};
