import CpuAction from "../CpuAction"
import BinaryValue from "../../../../model/BinaryValue"
import { ExecutionContext } from "../../../ExecutionContext"

export default class SetALU2 extends CpuAction {
	constructor() {
		super()
		this._name = "SetALU2"
	}

	protected async action(ctx: ExecutionContext): Promise<any> {
		let value = ctx.wires.model.data_mux_alu.get().unsigned();
        // Si el valor es 2048, se reemplaza por cero
        if (value === 2048) {
            value = 0;
        }
        ctx.cpu.model.alu2.set(new BinaryValue(16, value))
        await ctx.cpu.component.flash("ALU:2")
	}
}
