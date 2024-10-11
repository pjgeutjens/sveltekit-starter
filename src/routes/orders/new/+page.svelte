<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { orderSchema, type OrderSchema } from '$lib/config/zod-schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { Select, SelectGroup, SelectValue } from '$lib/components/ui/select';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectLabel from '$lib/components/ui/select/select-label.svelte';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	export let data: any;

	export let form: SuperValidated<OrderSchema>;
	export let trips;
	trips = data.trips;
	form = data.form;
</script>

<div class="flex items-center justify-center mx-auto max-w-2xl">
	<Form.Root let:submitting let:errors method="POST" {form} schema={orderSchema} let:config>
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
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select a trip" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Trips</SelectLabel>
							{#each trips as trip}
								<SelectItem value={trip.id}>{trip.origin} to {trip.destination}</SelectItem>
							{/each}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Form.Button class="w-full" href="/trips/new"
						>{#if submitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait{:else}+ New trip{/if}
					</Form.Button>

				<Form.Field {config} name="userEmail">
					<Form.Item>
						<Form.Label>User Email</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Button class="w-full" disabled={submitting}
					>{#if submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}+ Add item{/if}
				</Form.Button>
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
