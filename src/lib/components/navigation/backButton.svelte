<script lang="ts">
	import { onMount } from "svelte";
	import Button from "../ui/button/button.svelte";
    let backPathname = ""
    onMount(() => (backPathname = document.referrer))

    export let buttonText = "Go back"
</script>

<Button class="w-full" variant="outline"
	on:click={() => history.go(-1)}
>
	{buttonText}
</Button>
