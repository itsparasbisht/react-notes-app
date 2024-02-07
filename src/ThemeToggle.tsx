import { Switch } from "@radix-ui/themes";

type ThemeToggleProps = {
  hasDarkTheme: boolean;
  toggleTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ThemeToggle({
  hasDarkTheme,
  toggleTheme,
}: ThemeToggleProps) {
  return (
    <div className="flex items-center gap-2 dark:text-gray-200 mr-2">
      Light
      <Switch
        checked={hasDarkTheme}
        onCheckedChange={() => {
          toggleTheme((prev) => !prev);
        }}
      />{" "}
      Dark
    </div>
  );
}
