type Articles = {
  title: string;
  content: string;
};

export const createQuiz = async (articles: Articles) => {
  await fetch("api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(articles),
  });
};
