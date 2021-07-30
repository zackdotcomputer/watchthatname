import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

export default function FavoriteButton({
  isOn,
  onClick
}: {
  isOn: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button onClick={onClick} className="smart-hover">
      <span className="no-hover">
        <FontAwesomeIcon icon={isOn ? faHeartFilled : faHeart} />
      </span>
      <span className="yes-hover opacity-70">
        <FontAwesomeIcon
          className={classNames({ "text-red-800": !isOn })}
          icon={isOn ? faHeartBroken : faHeartFilled}
        />
      </span>
    </button>
  );
}
