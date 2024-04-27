import React from "react";

type Props = { word: string; rank: number };

const Word = (props: Props) => {
  return (
    <div className="p-2 border rounded-lg justify-between flex items-center bg-zinc-950">
      <span className="font-bold text-lg">
        <span className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              props.rank < 300
                ? "bg-green-400"
                : props.rank < 2500
                ? "bg-orange-400"
                : "bg-red-500"
            }`}
          ></div>
          {props.word.replace(props.word[0], props.word[0].toUpperCase())}
        </span>
      </span>
      <span>{props.rank}</span>
    </div>
  );
};

export default Word;
