<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { APP_NAME } from '$lib/config/constants';

	export let data;
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<meta name="description" content="Travoleh, you social shopping partner." />
</svelte:head>

<div class="flex-1">
	<section class="container grid items-center gap-6">
		<div class="flex max-w-[980px] flex-col items-start gap-2">
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
				{APP_NAME}
			</h1>
			<p class="max-w-[700px] text-lg text-muted-foreground">Your social shopping partner.</p>
		</div>
		{#if !data.user }
			<Button on:click={() => goto('/auth/sign-in')}>Sign in</Button>
			<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign up</Button>
		{/if}
		<div class="flex gap-4"></div>
	</section>
</div>
