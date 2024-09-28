<script lang="ts">
	import * as Accordion from "$lib/components/ui/accordion";

	export let data;

	const getAccordionValueForOrderStatus = (status: string) => {
		let result = ['order-status', 'order-details'];
		if (status === 'received' || status === 'confirmed') {
			result.push('contact-details');
			result.push('payment-info');
		}
		if (status === 'payment_info_sent') {
			result.push('payment-info'); 
		}
	};
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		<h1 class="text-lg">Order #{data.order.shortId}</h1>
		<p>{data.trip?.origin} to {data.trip?.destination}</p>
		<p>arriving {data.trip?.arrivalDate}</p>

		

		<Accordion.Root class="w-full sm:max-w-[70%]" multiple value={['order-details', 'order-status']} onValueChange={(value) => console.log(value)}>
			<Accordion.Item value="order-status">
				<Accordion.Trigger>Order status</Accordion.Trigger>
				<Accordion.Content>
				  {data.order.status}
				</Accordion.Content>
			  </Accordion.Item>
		  <Accordion.Item value="order-details">
			<Accordion.Trigger>Order Details</Accordion.Trigger>
			<Accordion.Content>
				<p>{data.order.productDescription} - {data.order.productPrice}</p>
				<p>Quantity: {data.order.quantity}</p>
			</Accordion.Content>
		  </Accordion.Item>
		  <Accordion.Item value="contact-details">
			<Accordion.Trigger>Delivery Details</Accordion.Trigger>
			<Accordion.Content>
			  <p>name</p>
			  <p>address</p>
			</Accordion.Content>
		  </Accordion.Item>
		  <Accordion.Item value="payment-info">
			<Accordion.Trigger>Payment Info</Accordion.Trigger>
			<Accordion.Content>
			  How to pay
			</Accordion.Content>
		  </Accordion.Item>
		</Accordion.Root>
	</div>
</section>
