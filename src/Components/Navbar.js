import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>BananesExport</h1>
      <div className="links">
        <a href="/">Postes de travail</a>
        <a href="/create">Ajouter un poste</a>
      </div>
    </nav>
  );
}

export default Navbar;
