<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { orderCreateSchema, type OrderCreateSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import { AlertCircle } from 'lucide-svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	export let data: any;

	export let form: SuperValidated<OrderCreateSchema>;
	export let trips;
	trips = data.trips;
	form = data.form;
	form.data.codPct = [0]

	export let min = 0;
	export let max = 100
	export let step = 5

	const handleSliderInput = (e: any) => {
		console.log(JSON.stringify(e))
	}
</script>

<div class="flex items-center justify-center mx-auto max-w-2xl">
	<Form.Root let:submitting let:errors method="POST" {form} schema={orderCreateSchema} let:config>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Order</Card.Title>
				<Card.Description>Create an order</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				{#if errors?._errors?.length}
					<Alert.Root variant="destructive">
						<AlertCircle class="h-4 w-4" />
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>
							{#each errors._errors as error}
								{error}
							{/each}
						</Alert.Description>
					</Alert.Root>
				{/if}
				<Form.Field {config} name="tripId">
					<Form.Item>
						<Form.Select name="tripId">
							<Form.SelectTrigger placeholder="Select a trip" />
							<Form.SelectContent>
								<Form.SelectGroup>
									<Form.SelectLabel>Trips</Form.SelectLabel>
									{#each trips as trip}
										<Form.SelectItem value={trip.id}
											>{trip.origin} to {trip.destination}</Form.SelectItem
										>
									{/each}
								</Form.SelectGroup>
							</Form.SelectContent>
						</Form.Select>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Button class="w-full" href="/trips/new"
					>{#if submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}+ New trip{/if}
				</Button>

				<Form.Field {config} name="userEmail">
					<Form.Item>
						<Form.Label>User Email</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Field {config} name="currency">
					<Form.Item>
						<Form.Label>Currency</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Form.Field {config} name="codPct[0]">
					<Form.Item>
						<Form.Label>Cash-on-delivery: {form.data.codPct[0]}%</Form.Label>
						<Slider {min} {max} {step} />
						<Form.Validation />
					</Form.Item>
				</Form.Field>

				<Button class="w-full" disabled={submitting}
					>{#if submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}+ Add item{/if}
				</Button>
			</Card.Content>
			<Card.Footer>
				<div class="block w-full">
					<Form.Button class="w-full" disabled={submitting}
						>{#if submitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait{:else}Register order{/if}
					</Form.Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</Form.Root>
</div>
