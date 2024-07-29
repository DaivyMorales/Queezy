import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { CustomRadio } from "../components/nextui/CustomRadio";
import { DataQueez } from "@/store/store";

interface QuestionProps {
  question: DataQueez;
  index: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
}

function Question({ question, index, setScore, score }: QuestionProps) {
  const [answer, setanswer] = useState(question.answer);
  return (
    <div key={index}>
      {question.answer}
      <RadioGroup>
        <h4 className="text-md font-semibold">
          {index + 1}. {question.question}
        </h4>
        {question.options.map((op, index) => (
          <CustomRadio
            size="sm"
            onClick={() => {
              if (op === answer) {
                setScore(score + 1);
              }
            }}
            value={op}
            key={index}
          >
            {op}
          </CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

export default Question;
