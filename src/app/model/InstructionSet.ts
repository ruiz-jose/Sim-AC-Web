import BinaryValue from "./BinaryValue"

export type Opcode = (typeof opcodes)[number]
export type SymbolicOpcode = (typeof opcodes)[number]["symbolic"]
export type NumericOpcode = (typeof opcodes)[number]["numeric"]
export type Operators = (typeof opcodes)[number]["operator"]

/** All the opcodes */
export const opcodes = [
	{
		symbolic: "ADD",
		numeric: 0,
		takesOperand: true,
		takesImmediate: false,
		direct: true,
		operator: "+",
		category: "ARITHMETIC_LOGIC"
	},
	{
		symbolic: "SUB",
		numeric: 1,
		takesOperand: true,
		takesImmediate: false,
		direct: true,
		operator: "-",
		category: "ARITHMETIC_LOGIC"
	},
	{
		symbolic: "LDA",
		numeric: 2,
		takesOperand: true,
		takesImmediate: false,
		operator: "=",
		category: "DATA_FLOW"
	},
	{
		symbolic: "STA",
		numeric: 3,
		takesOperand: true,
		takesImmediate: false,
		direct: true,
		operator: "",
		category: "DATA_FLOW"
	},
	{
		symbolic: "JMP",
		numeric: 4,
		takesOperand: true,
		takesImmediate: false,
		direct: false,
		operator: "",
		category: "CONTROL_FLOW"
	},
	{
		symbolic: "JZ",
		numeric: 5,
		takesOperand: true,
		takesImmediate: false,
		direct: false,
		operator: "",
		category: "CONTROL_FLOW"
	},
	{
		symbolic: "JC",
		numeric: 6,
		takesOperand: true,
		takesImmediate: false,
		direct: false,
		operator: "",
		category: "CONTROL_FLOW"
	},
	{
		symbolic: "LDI",
		numeric: 7,
		takesOperand: true,
		takesImmediate: true,
		direct: false,
		operator: "",
		category: "DATA_FLOW"
	},
	{
		symbolic: "NOP",
		numeric: 8,
		takesOperand: false,
		takesImmediate: false,
		direct: false,
		operator: "",
		category: "CONTROL_FLOW"
	},
	{
		symbolic: "HLT",
		numeric: 9,
		takesOperand: false,
		takesImmediate: false,
		direct: false,
		operator: "",
		category: "CONTROL_FLOW"
	}
] as const

export function opcode(param: string | BinaryValue): Opcode {
	return typeof param === "string"
		? opcodes.find(opcode => opcode.symbolic === param)
		: opcodes.find(opcode => opcode.numeric === param.getByte(1).unsigned())
}
