import { get, writable } from "svelte/store"
import { language } from "./settings"
import { parse as parseYaml } from "yaml"
import { Language } from "../../shared/util/i18n"

export type Text = typeof _default

const _default = {
	title: "",
	page_title: "",
	sections: {
		introduction: {
			title: "",
			subsections: {
				introduction: {
					title: "",
					text: ""
				}
			}
		},
		instruction_set: {
			title: "",
			subsections: {
				instruction_set: {
					title: ""
				},
				instruction_structure: {
					title: "",
					opcode_desc: "",
					immediate_flag_desc: "",
					operand_desc: ""
				},
				addressing_modes: {
					title: "",
					subsections: {
						immediate: {
							title: "",
							paragraphs: []
						},
						direct: {
							title: "",
							paragraphs: []
						}
					}
				}
			}
		},
		keyboard_shortcuts: {
			title: "",
			subsections: {
				keyboard_shortcuts: {
					title: ""
				}
			}
		},
		code_files: {
			title: "",
			subsections: {
				code_files: {
					title: "",
					paragraphs: []
				},
				new_lines: {
					title: "",
					paragraphs: []
				},
				syntax: {
					title: "",
					paragraphs: []
				}
			}
		},
		ui: {
			title: ""
		},
		examples: {
			title: "",
			subsections: {
				if_equal_then_else: {
					title: ""
				},
				if_less_then_else: {
					title: ""
				},
				do_while: {
					title: ""
				}
			}
		}
	},
	opcodes_table: {
		sections_titles: {
			control_flow: "",
			data_flow: "",
			arithmetic_logic: ""
		},
		descriptions: {
			ADD: "",
			SUB: "",
			LDA: "",
			STA: "",
			JMP: "",
			JZ: "",
			JC: "",
			LDI: "",
			NOP: "",
			HLT: ""
		}
	},
	shortcuts_table: {
		ram_editing: {
			title: "",
			headers: {
				keys: "",
				condition: "",
				description: ""
			},
			shortcuts: [
				{
					keys: "",
					condition: "",
					description: ""
				}
			]
		}
	}
}

export const text = writable<Text>(_default)

export function fetchText(_lang: Language) {
	fetch(`resources/i18n/manual/${_lang}.yaml`)
		.then(res => res.text())
		.then(text => parseYaml(text))
		.then(data => text.set(data as Text))
}

export function init() {
	fetchText(get(language))
	language.subscribe(fetchText)
}

export default text
