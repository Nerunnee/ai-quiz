type Credentials = {
  title: string;
  content: string;
};

export const createPrompt = async (credentials: Credentials) => {
  const response = await fetch("api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(credentials),
  });

  const responseData = await response.json();

  return responseData;
};
