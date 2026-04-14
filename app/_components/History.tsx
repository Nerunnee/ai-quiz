import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";

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
            <p
              key={article.id}
              className="py-2.5 pl-2 cursor-pointer rounded-2xl hover:bg-cyan-700 hover:text-white"
            >
              {article.title}
            </p>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
