export interface SidebarMenu {
  title: string;
  url: string;
  icon: string;
  subMenus: SubMenuItem[]
}

export interface SubMenuItem {
  title: string;
  url: string;
}