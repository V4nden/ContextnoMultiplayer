import React from "react";

type Props = { word: string; rank: number };

const Word = (props: Props) => {
  return (
    <div className="p-2 border rounded-lg justify-between flex items-center">
      <span className="font-bold text-lg">
        {props.word.replace(props.word[0], props.word[0].toUpperCase())}
      </span>
      <span>{props.rank}</span>
    </div>
  );
};

export default Word;
