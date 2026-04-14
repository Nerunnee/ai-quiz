import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import { DeleteArticleButton } from "./DeleteArticleButton";

export const History = async () => {
  const articles = await prisma.article.findMany();

  return (
    <Sidebar className="mt-18">
      <SidebarHeader className="text-xl font-semibold ml-2">
        History
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col font-medium">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex justify-between items-center cursor-pointer rounded-2xl hover:bg-cyan-700 hover:text-white"
            >
              <p className="py-2.5 px-2 ">{article.title}</p>

              <DeleteArticleButton id={article.id} />
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
