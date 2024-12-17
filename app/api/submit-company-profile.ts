import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Here you would typically process the data and interact with your database
    // For this example, we'll just simulate a delay and return a success response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    res.status(200).json({ message: "Company profile submitted successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
