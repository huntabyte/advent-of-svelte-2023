<script lang="ts">
	import { cn } from "$lib/utils";
	import { buttonVariants } from "./ui/button";
	import GitHubIcon from "./icons/github.svelte";
	import XIcon from "./icons/x.svelte";
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center">
		<div class="flex">
			<a
				href="/"
				class="mr-6 flex w-full items-center justify-between space-x-2 transition-colors ease-linear hover:text-primary/90"
			>
				<div>
					<img src="/logo.png" alt="advent of svelte logo" class="h-10 w-full object-contain" />
				</div>
				<div>
					<span class="text-[15px] font-semibold sm:inline-block lg:text-base">
						Advent of Svelte
					</span>
				</div>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
			<nav class="flex items-center">
				<a href="https://github.com/huntabyte/advent-of-svelte-2023" target="_blank">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
						<GitHubIcon class="h-4 w-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
				<a href="https://x.com/huntabyte" target="_blank">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
						<XIcon class="h-3 w-3 fill-current" />
						<span class="sr-only">X (formerly known as Twitter)</span>
					</div>
				</a>
			</nav>
		</div>
	</div>
</header>
