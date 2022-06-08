<script lang="ts">
	import '../app.css';
	import { auth, signOut } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let userId: string | null = null;

	let menuIsOpen = false;

	beforeNavigate((navigation) => {
		if (userId && navigation.to?.pathname === '/') {
			navigation.cancel();
		} else if (!userId && navigation.to?.pathname !== '/') {
			navigation.cancel();
		}
	});

	onMount(() => {
		auth.onAuthStateChanged((user: any) => {
			if (user) {
				localStorage.setItem('user', user.uid);
				userId = user.uid;
				goto('/personajes');
			} else {
				localStorage.removeItem('user');
				userId = null;
				goto('/');
			}
		});
	});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => (menuIsOpen = !menuIsOpen)}
				>
					<span class="sr-only">Open main menu</span>
					<!--
						Icon when menu is closed.

						Heroicon name: outline/menu

						Menu open: "hidden", Menu closed: "block"
					-->
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
					<!--
						Icon when menu is open.

						Heroicon name: outline/x

						Menu open: "block", Menu closed: "hidden"
					-->
					<svg
						class="hidden h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="/"
							class="nav-item--{$page.routeId === '' ? 'current' : 'default'}"
							aria-current="page">Inicio</a
						>

						<a
							href="/personajes"
							class="nav-item--{$page.routeId === 'personajes' ? 'current' : 'default'}"
							>Personajes</a
						>
					</div>
				</div>
			</div>
			{#if userId}
				<button class="nav-item--default justify-self-end" on:click={signOut}>Cerrar sesión</button>
			{/if}
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div
		class="{menuIsOpen
			? 'h-16'
			: 'h-0'} sm:hidden transition-[height] overflow-hidden ease-in-out delay-150"
	>
		<div class="px-2 pt-2 pb-3 space-y-1">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a
				href="/"
				class="nav-item--{$page.routeId === '/' ? 'current' : 'default'}"
				aria-current="page">Inicio</a
			>

			<a
				href="/personajes"
				class="nav-item--{$page.routeId === 'personajes' ? 'current' : 'default'}">Personajes</a
			>

			{#if userId}
				<button class="nav-item--current" on:click={signOut}>Cerrar sesión</button>
			{/if}
		</div>
	</div>
</nav>

<slot />

<style>
	.nav-item--current {
		@apply bg-gray-900 text-white;
	}
	.nav-item--default {
		@apply text-gray-300 hover:bg-gray-700 hover:text-white;
	}

	[class^='nav-item--'] {
		@apply px-3 py-2 rounded-md text-sm font-medium;
	}
</style>
