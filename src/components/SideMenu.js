import React, { useEffect, useRef } from "react";

function SideMenu({ activeItemInMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const menuItems = menuRef.current?.querySelectorAll("[data-option] td");
    menuItems?.forEach((item) => {
      const isSelected = item.parentElement.dataset.option === activeItemInMenu;
      item.classList.toggle("active", isSelected);
    });
  }, [activeItemInMenu]);

  return (
    <table id="side-menu" ref={menuRef}>
      <tbody>
        <tr>
          <th className="table-heading">
            iPod <i className="fas fa-home"></i>
          </th>
        </tr>
        <tr data-option="coverflow">
          <td className="table-item">
            Coverflow<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="music">
          <td className="table-item">
            Music<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="games">
          <td className="table-item">
            Games<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="settings">
          <td className="table-item">
            Settings<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SideMenu;
