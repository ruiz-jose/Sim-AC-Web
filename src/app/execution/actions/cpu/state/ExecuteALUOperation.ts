import CheckedError from "../../../../errors/CheckedError"
import text from "../../../../store/text"
import BinaryValue from "../../../../model/BinaryValue"
import CpuAction from "../CpuAction"
import { ExecutionContext } from "../../../ExecutionContext"

export default class ExecuteALUOperation extends CpuAction {
	constructor() {
		super()
		this._name = "ExecuteALUOperation"
	}

	protected async action(ctx: ExecutionContext): Promise<any> {
		const cpu = ctx.cpu.model

		const operation = cpu.aluOperation.get()
		const alu1 = cpu.alu1.get().signed()
		const alu2 = cpu.alu2.get().signed()

		// Validación de entrada
		if (typeof alu1 !== "number" || typeof alu2 !== "number") {
			throw new Error(`Invalid input: alu1 and alu2 should be numbers, got ${typeof alu1} and ${typeof alu2}`)
		}

		let result: number

		switch (operation) {
			case "+":
				result = alu1 + alu2
				break
			case "-":
				result = alu1 - alu2
				break
			case "=":
				result = alu2
				break
			case "":
			default:
				throw new Error(`Unexpected ALU operation: "${operation}"`)
		}
		cpu.aluResult.set(new BinaryValue(8, result))

		// Limpiar los campos de la ALU después de la operación
		cpu.alu1.set(new BinaryValue(8, 0))
		cpu.alu2.set(new BinaryValue(8, 0))
		cpu.aluOperation.set("")
		
		// Actualizar la bandera Z si la operación es ADD o SUB y el resultado es cero
		if ((operation === "+" || operation === "-") && result === 0) {
            cpu.zeroFlag.set(true)
        } else {
			cpu.zeroFlag.set(false)
        }
	}
}
