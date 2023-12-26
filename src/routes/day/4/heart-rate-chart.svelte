<script lang="ts">
	import { VisXYContainer, VisLine, VisAxis } from "@unovis/svelte";
	import type { HeartRate } from "./+page";

	type Props = {
		data: HeartRate[];
	};

	let { data } = $props<Props>();
</script>

<VisXYContainer {data} width="900px" height="400px" autoMargin>
	<VisLine
		{data}
		color="#ff3352"
		x={(d) => new Date(d.timestamp).getTime()}
		y={(d) => d.heartRate}
	/>
	<VisAxis type="x" />
	<VisAxis type="y" />
</VisXYContainer>
