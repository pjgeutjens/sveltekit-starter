<script lang="ts">
	export let data;
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		<h1 class="text-lg">Trips</h1>
		<ul class="list-disc">
			{#each data.trips as trip}
				<li>
					<a href={`/trips/${trip.id}`}>
						from {trip.origin} to {trip.destination}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
