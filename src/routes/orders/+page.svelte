<script lang="ts">
	import { or } from "drizzle-orm";

    export let data;
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		<h1 class="text-lg">Orders</h1>
        <ul class="list-disc">
            {#if !data.orders}
                <li>No orders found</li>
            {/if}
            {#each data.orders as order}
                <li>
                    <a href={`/orders/${order.id}`}>
                        {order.productDescription}
                    </a>
                </li>
            {/each}
        </ul>
	</div>
</section>
