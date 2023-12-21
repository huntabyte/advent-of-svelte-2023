<script lang="ts">
	import { cn } from "$lib/utils";
	import { buttonVariants } from "./ui/button";
	import GitHubIcon from "./icons/github.svelte";
	import XIcon from "./icons/x.svelte";
</script>

<header
	class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<span class="hidden font-bold sm:inline-block text-[15px] lg:text-base">
					Advent of Svelte 2023
				</span>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
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
