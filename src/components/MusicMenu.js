import React, { useEffect, useRef } from "react";

function MusicMenu({ activeItemInMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const menuItems = menuRef.current?.querySelectorAll("[data-option] td");
    menuItems?.forEach((item) => {
      const isSelected = item.parentElement.dataset.option === activeItemInMenu;
      item.classList.toggle("active", isSelected);
    });
  }, [activeItemInMenu]);

  return (
    <table id="music-menu" ref={menuRef}>
      <tbody>
        <tr>
          <th className="table-heading">
            Music <i className="fas fa-music"></i>
          </th>
        </tr>
        <tr data-option="allSongs">
          <td className="table-item">
            All Songs<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="artists">
          <td className="table-item">
            Artists<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="albums">
          <td className="table-item">
            Albums<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MusicMenu;
