<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Dialog from "$lib/components/ui/dialog";
	let { data } = $props();

	let firstName = $state("");
	let lastName = $state("");
	let open = $state(false);
	let elfName = $state("");

	const numFirstNames = $derived(data.firstNames.length);
	const numLastNames = $derived(data.lastNames.length);

	function handleSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		e.preventDefault();

		const first = data.firstNames[Math.floor(Math.random() * numFirstNames)];
		const last = data.lastNames[Math.floor(Math.random() * numLastNames)];

		elfName = `${first} ${last}`;
		open = true;
		firstName = "";
		lastName = "";
	}
</script>

<Card.Root class="w-[400px] mx-auto">
	<Card.Header>
		<Card.Title>Generate your elf name</Card.Title>
		<Card.Description>Just enter your name and we'll handle the rest</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit} class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Label for="firstName">First name</Label>
				<Input id="firstName" bind:value={firstName} required />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="lastName">Last name</Label>
				<Input id="lastName" bind:value={lastName} required />
			</div>
			<Button type="submit">Generate</Button>
		</form>
	</Card.Content>
</Card.Root>

<Dialog.Root
	bind:open
	onOpenChange={(open) => {
		if (!open) elfName = "";
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="font-3xl text-center">Your Elf Name! ✨🧝</Dialog.Title>
		</Dialog.Header>
		<p class="text-4xl text-center">{elfName}</p>
	</Dialog.Content>
</Dialog.Root>
