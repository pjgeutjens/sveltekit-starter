<script lang="ts">
	import { or } from "drizzle-orm";
    import { Button } from "$lib/components/ui/button/index.js";

    export let data;

    const handleNewOrder = () => {
        console.log('new order')
    }
</script>

<section class="container grid items-center gap-6">
    {#if !data.orders.length}
    <div class="flex max-w-[980px] flex-col items-start gap-2">
          <h3 class="text-2xl font-bold tracking-tight">You have no orders</h3>
          <p class="text-muted-foreground text-sm">
            You can start as soon as you add an order.
          </p>
          <Button class="mt-4" href="/orders/new">Add Order</Button>
        </div>
    {:else}
    <div class="flex max-w-[980px] flex-col items-start gap-2">
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
    {/if}
	
</section>
