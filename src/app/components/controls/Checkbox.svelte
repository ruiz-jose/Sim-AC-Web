<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let disabled = false
	export let checked = false

	const dispatch = createEventDispatcher()

	function handleClick(e) {
		checked = !checked
		dispatch("click", e)
	}
</script>

<div
	class="       
		flex
		items-center
		justify-center
		gap-1
		select-none
		{disabled ? 'cursor-default' : 'cursor-pointer'}
		{$$restProps.class}
	"
	on:click={handleClick}
	on:focus
	on:focusout
	on:mouseenter
	on:mouseleave
	on:mouseover
	aria-hidden="true"
>
	<div
		class="
			w-4
			h-4
			border
			border-black
			rounded-md
			transition-colors
			{checked ? 'bg-[#0F0]' : ''}
			{disabled ? 'brightness-[.6]' : ''}
		"
	/>
	<div class="font-medium pb-[3px]"><slot /></div>
</div>
