import { MainLayout } from "@/components/layout/main-layout"
import { RouteObject } from "react-router-dom"

export const RouteMap: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        lazy: () => import("@/routes/no-match"),
      },
      {
        path: "",
        lazy: () => import("@/routes/home"),
        handle: {
          crumb: () => "Home",
        },
      },
      {
        path: "/albums",
        handle: {
          crumb: () => "Album",
        },
        children: [
          {
            path: ":id",
            lazy: () => import("@/routes/albums/album-detail"),
          },
        ],
      },
      {
        path: "/artists",
        handle: {
          crumb: () => "Artist",
        },
        children: [
          {
            path: ":id",
            lazy: () => import("@/routes/artists/artist-detail"),
          },
        ],
      },
    ],
  },
]
