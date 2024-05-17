<script lang="ts">
	import text from "../../stores/text"
	import CodeBlock from "../CodeBlock.svelte"
	import Section from "../Section.svelte"
</script>

<Section title={$text.sections.examples.subsections.if_then_else.title}>
	<div class="w-full flex flex-wrap justify-center gap-10">
		<!-- prettier-ignore -->
		<CodeBlock>
IF (condition equal)
THEN
	instruction_1
ELSE
	instruction_2
ENDIF
instruction_3
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
X = 3
Y = 3
Z = 0
if X == Y: # condición ==
	Z = 1
	print('Z = 1 => X es igual que Y')
else:
	Z = 0
	print('Z = 0 => X es distinto que Y')
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
               SUB Y
               JZ THEN
	           LDA #0
               ADD Y
               JMP ENDIF
THEN:          LDA #1
ENDIF:         STA Z               
               HLT
X:             3
Y:             3
Z:             0
		</CodeBlock>
	</div>
</Section>
<Section title={$text.sections.examples.subsections.if_then_else.title}>
	<div class="w-full flex flex-wrap justify-center gap-10">
		<!-- prettier-ignore -->
		<CodeBlock>
IF (condition less)
THEN
	instruction_1
ELSE
	instruction_2
ENDIF
instruction_3
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
X = 2
Y = 3
C = 0
if X less Y:    # condición menor
	C = 1
	print('C = 1 => X es menor que Y')
else:
	C = 0
	print('C = 0 => X es mayor o igual que Y')
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
               SUB Y
               JC LESS
	           LDA #0
               ADD Y
               JMP ENDIF
LESS:          LDA #1
ENDIF:         STA Z               
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
instruction_1
WHILE (condition)
DO
	instruction_2
	instruction_3
ENDWHILE
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
X = 1
SUMA = 0
while X != 10:  # sumar númemros del 1 al 9
	SUMA = SUMA + x
	X = X + 1
print(SUMA)
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA X
WHILE:         SUB DIEZ
               JZ ENDWHILE
               LDA DIEZ
               ADD X
               STA DIEZ
               LDA X
			   ADD UNO
			   STA X
               JMP WHILE
ENDWHILE:      STA SUMA
			   HLT	
X:             1
UNO:           1
DIEZ:          10
SUMA:           0
		</CodeBlock>
	</div>
</Section>
