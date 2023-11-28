import { Link } from "react-router-dom";

const NavBar = ({ theme }) => {
  return (
    <div
      className="navBarContainer"
      style={{
        color: theme
          ? "var(--text-color-dark-theme)"
          : "var(--text-color-light-theme)",
        backgroundColor: theme
          ? "var(--bg-dark-color)"
          : "var(--bg-light-color)",
      }}
    >
      <div className="menuLogoWrap">
        <div
          className="menuIconContainer"
          style={{
            backgroundImage: theme
              ? "url(/src/images/menuDarkIcon.png)"
              : "url(/src/images/menuLightIcon.png)",
          }}
        ></div>
        <Link
          to={`/home`}
          className="logoIconContainer"
          style={{
            backgroundImage: theme
              ? "url(/src/images/logoIconDarkMode.png)"
              : "url(/src/images/logoIconLightMode.png)",
          }}
        ></Link>
      </div>
      <div className="serchBarContainer">search</div>
    </div>
  );
};

export default NavBar;
