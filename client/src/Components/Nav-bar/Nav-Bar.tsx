import * as React from "react";
import { Link } from "react-router-dom";
import { TicketIcon } from "lucide-react";
import { HOMEPAGEURL } from "../../Constant";
import { TopNav } from "./Top-nav";
import { cn, scrollToTop } from "../../Lib/Utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


const NavigationBar = ()=> {
  return (
    <div className="text-center flex flex-col justify-center items-center sticky top-0 z-[998]">
      <TopNav />
      <div className="pt-3 pb-1 bg-white w-full flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={HOMEPAGEURL}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={scrollToTop}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3 hidden md:flex">
                    <NavigationMenuLink asChild>
                      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        <TicketIcon />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          QuickTix.com
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Secure your tickets for unforgettable experiences!
                          From concerts to theme parks, events, and more—explore
                          a world of excitement. Book your next adventure with
                          ease and get ready for the fun!
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </li>

                  <ListItem
                    title="Book Tickets"
                    to="/book-tickets"
                    onClick={scrollToTop}
                  >
                    Start your journey by booking tickets to exciting events and
                    attractions.
                  </ListItem>

                  <ListItem
                    title="How It Works"
                    to="/how-it-works"
                    target="_blank"
                  >
                    Learn how our ticket booking system works to make your
                    experience seamless.
                  </ListItem>

                  <ListItem
                    title="Events & Attractions"
                    to="/events"
                    onClick={scrollToTop}
                  >
                    Discover various events and attractions available for
                    booking.
                  </ListItem>

                  <ListItem
                    title="Offers & Discounts"
                    to="/offers"
                    onClick={scrollToTop}
                  >
                    Check out our special offers and discounts to save on your
                    tickets.
                  </ListItem>

                  <ListItem
                    title="Customer Support"
                    to="/support"
                    onClick={scrollToTop}
                  >
                    Need help? Contact our support team for assistance with your
                    bookings.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default NavigationBar;