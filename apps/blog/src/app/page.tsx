import Home from "../components/Home";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DialogDemo } from "@/components/SDialog";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <DialogDemo />

      <Home />

      <div className="navbar bg-base-300 rounded-box">
        <div className="flex-1 px-2 lg:flex-none">
          <a className="text-lg font-bold">daisyUI</a>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            <a className="btn btn-ghost rounded-btn">Button</a>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                Dropdown
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Button variant="default">Button</Button>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </main>
  );
}
