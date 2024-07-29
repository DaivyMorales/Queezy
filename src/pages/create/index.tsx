import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";
import { HiMiniSparkles } from "react-icons/hi2";
import QuestionCard from "../components/QuestionCard";
import { useQueezStore } from "@/store/store";

function Create() {
  const [loading, setLoading] = useState(false);

  const cleanText = (text: string) => text.replace(/\s+/g, " ");

  const {dataQueez, setDataQueez} = useQueezStore()

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
        setLoading(true);
        const response = await axios.post("/api/openai", updatedValues);

        const responseJson = JSON.parse(response.data);

        setDataQueez(responseJson);
        console.log(dataQueez);
        if (dataQueez) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      {/* <h2>Create Quize</h2> */}
      <div className="grid grid-cols-1 gap-4 px-10 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="">
              Text <span className="text-red-500">*</span>
            </label>
            <Card className="h-[500px] w-[500px] overflow-y-scroll px-6 py-8">
              <textarea onChange={formik.handleChange} name="text"></textarea>
            </Card>
            <Button
              isLoading={loading ?? loading}
              type="submit"
              color="primary"
              className="font-semibold"
              radius="md"
              startContent={!loading && <HiMiniSparkles size={16} />}
              spinner={
                <svg
                  className="h-5 w-5 animate-spin text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              Generate
            </Button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Example</label>

          {loading ? (
            <Card
              className="flex h-[500px] w-[500px] flex-col gap-10 px-6 py-8"
              radius="lg"
            >
              <Skeleton className="space-y-3 rounded-lg">
                <div className="h-6 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <Skeleton className="space-y-3 rounded-lg">
                <div className="h-6 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <Skeleton className="space-y-3 rounded-lg">
                <div className="h-6 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ) : (
            <QuestionCard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
