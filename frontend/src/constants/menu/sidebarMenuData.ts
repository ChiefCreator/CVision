import { MenuItemData } from "@/types/menu/menu";
import { Files, LayoutDashboard } from "lucide-react";

export const sidebarMenuData: MenuItemData = [
	{
		id: "dashboard",
		type: "link",
		pathname: "/dashboard",
		isIndexPathname: true,
		title: "Дашборд",
		Icon: LayoutDashboard,
	},
	{
		id: "documents",
		type: "button",
		title: "Документы",
		Icon: Files,
		children: [
			{
				id: "resumes",
				type: "link",
				pathname: "/resumes",
				title: "Резюме",
			},
			{
				id: "coverLetters",
				type: "link",
				pathname: "/cover-letters",
				title: "Сопроводительные письма",
			},
		],
	},
]