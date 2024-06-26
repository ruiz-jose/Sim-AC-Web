<script lang="ts">
	import { ramStore } from "../../store/state"
	import { messageFeedStore } from "../../store/state"
	import ramSelection from "../../store/ramSelection"
	import { animationsEnabled, displayAsBinary } from "../../store/settings"
	import { parseBinary, parseSymbolic } from "../../util/instructionParser"
	import { flash as flashComponent } from "../../util/animation"
	import logger, { LogCategory } from "../../util/logger"
	import Instruction from "../../model/Instruction"
	import SymbolTable from "../../model/SymbolTable"
	import { Color } from "../../util/colors"

	export let symbolTable: SymbolTable
	export let address: number
	export let instruction: Instruction
	export let isSelected: boolean

	let opcode: string
	let operand: string
	let isReplaced: boolean

	$: {
		isReplaced = $ramStore.getReplacedHltInstructions().includes(address)
		if (instruction === Instruction.NOP) {
			opcode = ""
			operand = ""
		} else {
			opcode = $displayAsBinary ? instruction.binaryOpcode().slice(-3) : instruction.symbolicOpcode
			operand = $displayAsBinary ? instruction.binaryOperand().slice(-5) : instruction.symbolicOperand
		}
	}

	$: onSelectedChange(isSelected)
	$: onInstructionChange(instruction)
	$: onAddressChange(address)

	let cell: HTMLDivElement

	let inputValue: string

	export async function flash(): Promise<void> {
		if (!$animationsEnabled) return
		return flashComponent(cell, "background-color", Color.GREEN)
	}

	export function getAddress(): number {
		return address
	}

	function commitEdit(): void {
		try {
			if (inputValue !== "") {
				logger.debug(`RamCell input: "${inputValue}"`, LogCategory.USER_INPUT)
				if ($displayAsBinary) {
					$ramStore.write(address, parseBinary(inputValue.trim()))
				} else {
					$ramStore.write(address, parseSymbolic(inputValue.trim(), symbolTable))
				}
			}
		} catch (error) {
			$messageFeedStore?.error(error.message)
			logger.handled_error(error.message, LogCategory.USER_INPUT)
		} finally {
			deselect()
		}
	}

	function select(): void {
		logger.debug(`Cell selected - Address: "${address}"`, LogCategory.USER_INPUT)
		ramSelection.select(address, "CELL")
	}

	function deselect(): void {
		if (ramSelection.isSelected(address, "CELL")) {
			logger.debug(`Cell deselected - Address: "${address}"`, LogCategory.USER_INPUT)
			ramSelection.deselect()
		}
	}

	function onAddressChange(newAddress: number): void {
		inputValue = opcode + (operand ? ` ${formatOperand()}` : "")
	}

	function onInstructionChange(newInstruction: Instruction): void {
		inputValue = opcode + (operand ? ` ${formatOperand()}` : "")
	}

	function onSelectedChange(isNowSelected: boolean): void {
		if (isNowSelected) {
			inputValue = opcode + (operand ? ` ${formatOperand()}` : "")
		}
	}

	function formatOperand(): string {
		if (['ADD', 'SUB', 'LDA', 'STA'].includes(opcode) && operand && !operand.startsWith("[") && !operand.endsWith("]")) {
			return `[${operand}]`;
		}
		return operand;
	}

	function formatInput(): void {
		const [instruction, operand] = inputValue.split(" ");
		const allowedInstructions = ["ADD", "SUB", "LDA", "STA"];
		if (allowedInstructions.includes(instruction.toUpperCase())) {
			inputValue = inputValue.toUpperCase().replace(/[^A-Z0-9 _\-#\(\)\[\]]*/g, "");
		} else {
			inputValue = inputValue.toUpperCase().replace(/[^A-Z0-9 _\-#\(\)]*/g, "");
		}
	}

	function focus(node: HTMLElement): void {
		node.focus()
	}

	function highlightText(node: HTMLInputElement): void {
		setTimeout(() => node.select())
	}
</script>

<div
	class="
		h-[30px]
		w-[190px]
		grid
		grid-cols-2
		items-center
		{isReplaced ? 'replaced-hlt' : 'bg-gray-200'}
		cursor-text
		border
		border-black
		border-t-0
		border-l-0
		font-mono
		{$$restProps.class}
	"
	on:click={select}
	on:keydown={select}
	bind:this={cell}
>
	{#if isSelected}
		<input
			bind:value={inputValue}
			on:focusout={commitEdit}
			on:input={formatInput}
			use:focus
			use:highlightText
			class="
				h-[30px]
				w-[190px]
				p-0
				pl-[10px]
				border-0
				col-span-1
				outline-none
				bg-black
				text-gray-200
				selection:bg-transparent
			"
		/>
	{:else}
		<div class={`h-[30px] w-[95px] leading-[30px] text-left pl-[10px] ${isReplaced ? 'replaced-hlt' : ''}`}>{opcode}</div>
		{#if operand}
			<div
				class="h-[30px] w-[95px] min-w-0 leading-[30px] text-left overflow-hidden text-ellipsis whitespace-nowrap"
			>
			{$displayAsBinary?operand: formatOperand()}
			</div>
		{/if}
	{/if}	
</div>

<style lang="scss">
	.first-cell {
		border-radius: 0 16px 0 0;
		border-top-width: 1px;

		input {
			border-radius: 0 16px 0 0;
		}
	}

	.last-cell {
		border-radius: 0 0 16px 0;

		input {
			border-radius: 0 0 16px 0;
		}
	}

	.replaced-hlt {
        background-color: #f56565; // Cambia esto al color que desees
    }
</style>
