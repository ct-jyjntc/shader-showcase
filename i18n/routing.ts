import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "zh", "es", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
  },
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
