<script lang="ts">
	import { ramStore, symbolTableStore, cpuStore } from "../../../store/state"
	import { parseProgram } from "../../../util/programParser"
	import logger, { LogCategory } from "../../../util/logger"
	import { messageFeedStore } from "../../../store/state"
	import { upload } from "../../../../shared/util/file"
	import MenuItemIcon from "../MenuItem.svelte"
	import text from "../../../store/text"

	async function loadProgram(): Promise<void> {
		try {
			// Obtén las instancias de la CPU y la RAM
			const cpu = cpuStore.get();
			const ram = ramStore.get();

			// Resetear el CPU y la RAM antes de cargar el programa
			cpu.reset();
			ram.clear();

			const file = (await upload(".ac"))[0]
            const originalProgram = await file.text();
            const translatedProgram = translateProgram(originalProgram);
			// Mostrar translatedProgram en la consola
			console.log(translatedProgram);
            const program = parseProgram(translatedProgram)			
			symbolTableStore.get().import(program.symbolTable)
			ramStore.get().import(program.ram)
			logger.debug("Program loaded from file", LogCategory.USER_INPUT)
		} catch (error) {
			logger.handled_error(error, LogCategory.USER_INPUT)
			$messageFeedStore.error(error.message)
		}
	}

	function translateProgram(originalProgram) {
        let codeLines = [];
        let variableLines = [];
        let lines = originalProgram.split('\n');
		let translated_program = "";
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith(';') || line.startsWith('SECTION')) {
                continue;
            }
            if (line.includes('DB')) {
                let parts = line.split('DB');
                let variableName = parts[0].trim();
                let value = parts[1].trim();
				variableName = variableName.replace(":", "");
                variableLines.push(`${variableName}: ${value}`);
            } else {
				if (line.endsWith(':')){  // Si la línea termina con ':', es una etiqueta					
            		translated_program = line + " ";  // Agrega un espacio en lugar de un salto de línea
				}
				else {
					translated_program += line 
					codeLines.push(translated_program);	
					translated_program = "";  // Reinicia la variable para la siguiente línea
				}	
                
            }
        }
        return [...codeLines, ...variableLines].join('\n');
    }
</script>

<button on:click={loadProgram}>
	<MenuItemIcon text={$text.menu.buttons.load.text} title={$text.menu.buttons.load.title} icon="open" />
</button>
