import React from "react";

type StatusButtonProps = {
  handleComplete: React.MouseEventHandler<HTMLButtonElement>;
  completed: boolean;
};

const StatusButton = ({ handleComplete, completed }: StatusButtonProps) => {
  return (
    <button
      className="relative outline outline-primary rounded-full h-4 w-4 flex justify-center items-center"
      onClick={handleComplete}
    >
      {completed && (
        <span className="absolute h-3 w-3 bg-primary rounded-full"></span>
      )}
    </button>
  );
};

export default StatusButton;
