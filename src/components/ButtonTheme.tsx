import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContextData";
import { IconDeviceImac, IconMoon, IconSun } from "@tabler/icons-react";

export default function ButtonTheme() {
	const { theme, setTheme } = useTheme();

	const handleThemeChange = (value: string) => {
		setTheme(value as "light" | "dark" | "system");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon-lg">
					<IconSun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<IconMoon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-9" align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Tema</DropdownMenuLabel>

					<DropdownMenuRadioGroup
						value={theme}
						onValueChange={handleThemeChange}
					>
						<DropdownMenuRadioItem value="light">
							<IconSun />
							Light
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="dark">
							<IconMoon />
							Dark
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="system">
							<IconDeviceImac />
							System
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
