import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import { DeleteArticleButton } from "./DeleteArticleButton";
import Link from "next/link";

export const History = async () => {
  const articles = await prisma.article.findMany();

  return (
    <Sidebar className="mt-18 p-4">
      <SidebarHeader className="text-xl font-semibold ml-2">
        History
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col font-medium">
          {articles.map((article) => (
            <Link key={article.id} href={`/${article.id}`}>
              <div className="flex justify-between items-center cursor-pointer rounded-2xl hover:bg-gray-800 hover:text-white">
                <p className="py-2.5 px-2 text-sm">{article.title}</p>

                <DeleteArticleButton id={article.id} />
              </div>
            </Link>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
