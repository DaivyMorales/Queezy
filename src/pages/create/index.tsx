import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { simpleQueez } from "@/utils/simpleQueez";
import {Button} from '@nextui-org/button';

function Create() {
  const [queez, setQueez] = useState(simpleQueez);

  const cleanText = (text: string) => text.replace(/\s+/g, " ");

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: async (values) => {
      const { text, ...rest } = values;
      const cleanedText = cleanText(text);

      const updatedValues = { text: cleanedText, ...rest };

      console.log(updatedValues);

      try {
        const response = await axios.post("/api/openai", updatedValues);

        const responseJson = JSON.parse(response.data);

        setQueez(responseJson);
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2>Create Quize</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="">
              Text <span className="text-red-500">*</span>
            </label>
            <div className="h-[500px] w-[500px] rounded-xl border-[1px] border-neutral-800 bg-[#1C1D1C] p-4">
              <textarea onChange={formik.handleChange} name="text"></textarea>
            </div>
            <button
              type="submit"
              className="rounded-lg border-[1px] border-blue-500 bg-gradient-to-b from-sky-600 to-blue-600 py-2 text-[14px] font-normal"
            >
              Generate
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Output</label>
          <div className="h-[500px] w-[300px] rounded-xl border-[1px] border-neutral-800 bg-[#1C1D1C] p-4">
            <div className="text-xs">
              {queez.map((question) => (
                <div key={question.question}>
                  <h4 className="text-[15px] font-medium">
                    {" "}
                    {question.question}
                  </h4>
                  <ul>
                    {question.options.map((op, index) => (
                      <li className="text-neutral-400" key={index}>
                        {op}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* <h3>1. What's Lorem Ipsum?</h3>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li className="rounded-lg border-[1px] border-neutral-800 p-4">
                a. Text
              </li>
              <li className="rounded-lg border-[1px] border-neutral-800 p-4">
                b. A Code
              </li>
              <li className="rounded-lg border-[1px] border-neutral-800 p-4">
                c. A Laptop
              </li>
              <li className="rounded-lg border-[1px] border-neutral-800 p-4">
                d. A Color
              </li>
            </ul> */}
            <Button>Click me</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;

