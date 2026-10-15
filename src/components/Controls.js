import "./css/controls.css";
import { useEffect, useRef } from "react";
import leftArrow from "./images/left-arrow.png";
import rightArrow from "./images/right-arrow.png";
import bottomArrow from "./images/arrow-pointing-downwards.png";

// introduce your own eventhandler for eac button Here.
function Controls({ onRotate, onOk, onMenu }) {
  const lastPoint = useRef(null);
  const lastAngle = useRef(null);
  const accumulatedRotation = useRef(0);
  const wheelRef = useRef(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return undefined;

    // A rotate event is emitted by circular-gesture helpers (and is easy to
    // dispatch from an automated browser test).  Supporting it here keeps the
    // navigation separate from the particular input device used for the wheel.
    const handleRotate = (event) => {
      const detail = event.detail || {};
      const movement =
        detail.distanceFromLast ?? detail.rotation ?? detail.angle ?? 1;
      onRotate(movement < 0 ? -1 : 1);
    };

    wheel.addEventListener("rotate", handleRotate);
    return () => wheel.removeEventListener("rotate", handleRotate);
  }, [onRotate]);

  const startRotation = (event) => {
    if (event.target.closest("#ok-button, #menu-button")) return;
    lastPoint.current = { x: event.clientX, y: event.clientY };
    const bounds = event.currentTarget.getBoundingClientRect();
    lastAngle.current = Math.atan2(
      event.clientY - (bounds.top + bounds.height / 2),
      event.clientX - (bounds.left + bounds.width / 2)
    );
    accumulatedRotation.current = 0;
  };

  const rotate = (event) => {
    if (lastAngle.current === null) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const angle = Math.atan2(
      event.clientY - (bounds.top + bounds.height / 2),
      event.clientX - (bounds.left + bounds.width / 2)
    );
    // Normalise to the shortest angular distance, including at the -180/180°
    // boundary. In browser coordinates positive movement is clockwise.
    let delta = angle - lastAngle.current;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;

    accumulatedRotation.current += delta;
    // The home menu has four choices, so a quarter turn selects the next one.
    const step = Math.PI / 2;
    while (Math.abs(accumulatedRotation.current) >= step) {
      onRotate(accumulatedRotation.current > 0 ? 1 : -1);
      accumulatedRotation.current -=
        Math.sign(accumulatedRotation.current) * step;
    }

    lastAngle.current = angle;
    lastPoint.current = { x: event.clientX, y: event.clientY };
  };

  const finishRotation = () => {
    lastPoint.current = null;
    lastAngle.current = null;
    accumulatedRotation.current = 0;
  };
  return (
    <section id="controls">
      <div
        id="wheel"
        ref={wheelRef}
        onMouseDown={startRotation}
        onMouseMove={rotate}
        onMouseUp={finishRotation}
        onMouseLeave={finishRotation}
      >
        <span
          id="menu-button"
          className="buttons"
          style={{ top: 20 }}
          onClick={onMenu}
        >
          Menu
        </span>
        <img
          className="buttons"
          draggable="false"
          src={leftArrow}
          alt="left"
          style={{ left: 13, width: 40 }}
        ></img>
        <img
          className="buttons"
          draggable="false"
          src={rightArrow}
          alt="right"
          style={{ right: 13, width: 40 }}
        ></img>
        <img
          className="buttons"
          draggable="false"
          src={bottomArrow}
          alt="bottom"
          style={{ bottom: 13, width: 30, height: 37 }}
        ></img>
        <div
          id="ok-button"
          onClick={onOk}
          role="button"
          tabIndex="0"
          onKeyDown={(event) => event.key === "Enter" && onOk()}
        >
          <b>OK</b>
        </div>
      </div>
    </section>
  );
}

export default Controls;
