import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI();

export default async function Gpt(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { text },
  } = req;

  try {
    if (!text) {
      res.status(400).json({ message: "You have not provided the text!" });
      return;
    }

    // if (!accessToken) {
    //   res
    //     .status(403)
    //     .json({ message: "You have not provided the access token!" });
    //   return;
    // }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Your are a profestional teacher, Can you help to build a 5 question queez with multiple options about the next text? Give me the queez on a object array, ommit "const name =", just give me the array (Just give me the queez, ommit your greatings or something else): ${text}`,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0,
    });

    const result = completion.choices[0]?.message.content;

    if (!result) {
      throw new Error("Result is undefined or null");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
