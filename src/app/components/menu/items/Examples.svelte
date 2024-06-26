<script lang="ts">
	import { messageFeedStore } from "../../../store/state"
	import text from "../../../store/text"
	import { ramStore, symbolTableStore } from "../../../store/state"
	import logger, { LogCategory } from "../../../util/logger"
	import { parseProgram } from "../../../util/programParser"
	import { Menu, MenuButton, MenuItems, MenuItem } from "@rgossiaux/svelte-headlessui"
	import MenuItemIcon from "../MenuItem.svelte"

	const examples = [
		{
			id: "simple_add",
			url: "resources/examples/simple_add.ac"
		},
		{
			id: "if_equal_then_else",
			url: "resources/examples/if_equal_then_else.ac"
		},
		{
			id: "if_less_then_else",
			url: "resources/examples/if_less_then_else.ac"
		},
		{
			id: "while_do",
			url: "resources/examples/while_do.ac"
		},
		{
			id: "array_sum",
			url: "resources/examples/array_sum.ac"
		}
	] as const

	async function loadExample(exampleUrl: string): Promise<void> {
		try {
			const example = await fetch(exampleUrl).then(res => res.text())
			const program = parseProgram(example)
			symbolTableStore.get().import(program.symbolTable)
			ramStore.get().import(program.ram)
			logger.debug(`Example ${exampleUrl} loaded`, LogCategory.USER_INPUT)
		} catch (error) {
			logger.handled_error(error.message, LogCategory.USER_INPUT)
			$messageFeedStore.error(error.message)
		}
	}
</script>

<Menu>
	<MenuButton>
		<MenuItemIcon
			text={$text.menu.buttons.examples.text}
			title={$text.menu.buttons.examples.title}
			icon="examples"
		/>
	</MenuButton>
	<MenuItems
		class="absolute flex flex-col mt-1 bg-neutral-500 border-2 border-neutral-800 shadow-lg rounded-md"
	>
		{#each examples as example}
			<MenuItem
				class="
					bg-neutral-500
					text-gray-200
					text-sm
					py-1
					px-2
					border-b-2
					border-neutral-700
					first:rounded-t-md
					last:border-0
					last:rounded-b-md
					hover:brightness-[.93]
					active:brightness-[.80]
				"
				title={$text.menu.buttons.examples.examples[example.id].title}
			>
				<button class="text-base leading-none" on:click={() => loadExample(example.url)}>
					{$text.menu.buttons.examples.examples[example.id].text}
				</button>
			</MenuItem>
		{/each}
	</MenuItems>
</Menu>
