import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Card } from "@nextui-org/react";
import { CustomRadio } from "../components/nextui/CustomRadio";
import { useQueezStore } from "@/store/store";

function QuestionCard() {
  const { dataQueez } = useQueezStore();

  return (
    <Card className="h-[500px] w-[500px] overflow-y-scroll px-6 py-8">
      <div className="flex flex-col gap-10">
        {dataQueez.map((question, index) => (
          <div key={index}>
            <RadioGroup>
              <h4 className="text-md font-semibold">
                {index + 1}. {question.question}
              </h4>
              {question.options.map((op, index) => (
                <CustomRadio size="sm" value={op} key={index}>
                  {op}
                </CustomRadio>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default QuestionCard;
