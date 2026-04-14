export const createSummarize = async (
  title: string,
  content: string,
  userId: string,
) => {
  const response = await fetch("api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ title, content, userId }),
  });
  const parsedData = await response.json();
  return parsedData;
};
