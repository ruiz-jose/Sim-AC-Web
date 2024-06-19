<script lang="ts">
	import text from "../../stores/text"
	import CodeBlock from "../CodeBlock.svelte"
	import Section from "../Section.svelte"
</script>

<Section title={$text.sections.examples.subsections.if_equal_then_else.title}>
	<div class="w-full flex flex-wrap justify-center gap-10">
		
		<CodeBlock>
X = 3
Y = 3
Z = 0
Si (X == Y):   # Igual ==
	Z = 1
Sino:
	Z = 0

		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
               SUB Y
               JZ Es_Igual
	           LDI #0
               ADD Y
               JMP Fin
Es_Igual:      LDI #1
Fin:         STA Z               
               HLT
X:             3
Y:             3
Z:             0
		</CodeBlock>
	</div>
</Section>
<Section title={$text.sections.examples.subsections.if_less_then_else.title}>
	<div class="w-full flex flex-wrap justify-center gap-10">

		<!-- prettier-ignore -->
		<CodeBlock>
X = 2
Y = 3
C = 0
if (X &lt; Y):    # c menor
	C = 1
else:
	C = 0
</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
               SUB Y
               JC Es_Menor
	           LDI #0
               ADD Y
               JMP Fin
Es_Menor:      LDI #1
Fin:         STA Z               
               HLT
X:             2
Y:             3
Z:             0
		</CodeBlock>
	</div>
</Section>
<Section title={$text.sections.examples.subsections.do_while.title}>
	<div class="w-full flex flex-wrap justify-center gap-10">

		<!-- prettier-ignore -->
		<CodeBlock>
X = 1
SUMA = 0
while X != 10:  # sumar númemros del 1 al 9
	SUMA = SUMA + x
	X = X + 1

		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
Bucle:         SUB DIEZ
               JZ Salir_Bucle
               LDA DIEZ
               ADD X
               STA DIEZ
               LDA X
			   ADD UNO
			   STA X
               JMP Bucle
Salir_Bucle:   STA SUMA
			   HLT	
X:             1
UNO:           1
DIEZ:          10
SUMA:          0
		</CodeBlock>
	</div>
</Section>
