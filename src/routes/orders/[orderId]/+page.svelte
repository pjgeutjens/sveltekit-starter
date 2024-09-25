<script>
	export let data;
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		<h1 class="text-lg">Order Details</h1>
		<p>{data.trip?.origin} to {data.trip?.destination} arriving {data.trip?.arrivalDate}</p>

		<p>{data.order.productDescription} - {data.order.productPrice}</p>
	</div>
</section>
