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
SUM = 0
COUNT = 0
WHILE COUNT != MAX
DO
	COUNT = COUNT + 1
	SUM = SUM + COUNT
ENDWHILE
		</CodeBlock>
		<!-- prettier-ignore -->
		<CodeBlock>
			<!-- &zwnj; is there so that leading whitespaces are not removed, it should be an invisible character -->
&zwnj;               LDA #0
               STA SUM
               STA COUNT
WHILE:         LDA COUNT
               CMP MAX
               JZ ENDWHILE
               ADD #1
               STA COUNT
               ADD SUM
               STA SUM
               JMP WHILE
ENDWHILE:      HLT
MAX:           5
COUNT:         0
SUM:           0
		</CodeBlock>
	</div>
</Section>
