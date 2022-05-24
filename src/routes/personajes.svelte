<script lang="ts">
	import { onMount } from 'svelte';

	let personajes: any[] = [];
	let paginaSeleccionada: number = 1;
	let loading: boolean = true;

	async function fetchPersonajes(pageNumber: number) {
		try {
			loading = true;
			const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
			const data = await res.json();
			return [...data.results];
		} catch {
			console.log('malió sal');
			return [];
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		paginaSeleccionada = 1;
		personajes = await fetchPersonajes(paginaSeleccionada);
	});
</script>

<h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate py-6 pl-6">
	Personajes
</h1>

<nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-4 mx-2">
	<!-- PREVIOUS -->
	<div class="-mt-px w-0 flex-1 flex">
		<button
			class="previous-page-button"
			disabled={loading || paginaSeleccionada === 1}
			on:click={async () => {
				paginaSeleccionada = paginaSeleccionada - 1;
				personajes = await fetchPersonajes(paginaSeleccionada);
			}}
		>
			<!-- Heroicon name: solid/arrow-narrow-left -->
			<svg
				class="mr-3 h-5 w-5 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			Previous
		</button>
	</div>
	<!-- PAGE NUMBERS -->
	<div class="hidden md:-mt-px md:flex">
		{#each new Array(10).fill(0).map((_, i) => i + 1) as pageNumber}
			<button
				class={pageNumber == paginaSeleccionada
					? 'border-t-2 border-gray-500'
					: 'border-transparent'}
				on:click={async () => {
					paginaSeleccionada = pageNumber;
					personajes = await fetchPersonajes(paginaSeleccionada);
				}}>{pageNumber}</button
			>
		{/each}
	</div>
	<!-- NEXT -->
	<div class="-mt-px w-0 flex-1 flex justify-end">
		<button
			disabled={loading || paginaSeleccionada === 10}
			on:click={async () => {
				paginaSeleccionada = paginaSeleccionada + 1;
				personajes = await fetchPersonajes(paginaSeleccionada);
			}}
			class="next-page-button"
		>
			Next
			<!-- Heroicon name: solid/arrow-narrow-right -->
			<svg
				class="ml-3 h-5 w-5 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</nav>

{#if loading}
	<span>Loading...</span>
{:else}
	<ul
		class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 px-4"
	>
		{#each personajes as personaje}
			<li class="relative">
				<div
					class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
				>
					<img
						src={personaje.image}
						alt=""
						class="object-cover pointer-events-none group-hover:opacity-75"
					/>
					<button type="button" class="absolute inset-0 focus:outline-none">
						<span class="sr-only">View details for {personaje.name}</span>
					</button>
				</div>
				<p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
					{personaje.name}
				</p>
				<p class="block text-sm font-medium text-gray-500 pointer-events-none">
					{personaje.status}
				</p>
			</li>
		{/each}
	</ul>
{/if}

<style>
	nav button {
		@apply text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium;
	}

	.previous-page-button {
		@apply border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300;
	}

	.next-page-button {
		@apply border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300;
	}

	.previous-page-button:disabled,
	.next-page-button:disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
