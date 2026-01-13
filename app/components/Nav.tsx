import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  
  export function Nav() {
    return (
      <NavigationMenu className="mb-8 ml-auto">
        <NavigationMenuList
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-center
            sm:gap-6
          "
        >
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#features"
              className={navigationMenuTriggerStyle()}
            >
              Features
            </NavigationMenuLink>
          </NavigationMenuItem>
  
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#pricing"
              className={navigationMenuTriggerStyle()}
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
  
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#integrations"
              className={navigationMenuTriggerStyle()}
            >
              Integrations
            </NavigationMenuLink>
          </NavigationMenuItem>
  
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#contact"
              className={navigationMenuTriggerStyle()}
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
  