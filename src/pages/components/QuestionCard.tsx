import React, { useState } from "react";
import { Card } from "@nextui-org/react";
import { useQueezStore } from "@/store/store";
import Question from "./Question";

function QuestionCard() {
  const { dataQueez } = useQueezStore();
  const [score, setScore] = useState(0)

  return (
    <Card className="h-[500px] w-[500px] overflow-y-scroll px-6 py-8">
      <div className="flex flex-col gap-10">
        {
          score
        }
        {dataQueez.map((question, index) => (
          <Question question={question} setScore={setScore} score={score} index={index}/>
        ))}
      </div>
    </Card>
  );
}

export default QuestionCard;
