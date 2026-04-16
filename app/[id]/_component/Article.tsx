type Articles = {
  content: string;
  title: string;
};

export const Article = (props: Articles) => {
  const { content, title } = props;

  return (
    <div className="p-4">
      <h1>{title}</h1>
      <p className="truncate">{content}</p>
    </div>
  );
};
