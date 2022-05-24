<script lang="ts">
	import { signIn } from '$lib/firebase';

	let email: string = '';
	let password: string = '';
</script>

<form
	on:submit={async (e) => {
		e.preventDefault();
		const response = await signIn(email, password);
		console.log(response);
	}}
>
	<input
		type="text"
		class="border border-blue-600 px-4 py-2 rounded"
		name="email"
		placeholder="Email"
		bind:value={email}
		required
		autocomplete="off"
	/>
	<input
		type="password"
		class="border border-blue-600 px-4 py-2 rounded"
		name="password"
		placeholder="Password"
		autocomplete="off"
		bind:value={password}
	/>
	<input
		type="submit"
		class="bg-blue-600 px-4 py-2 rounded text-white cursor-pointer"
		value="Submit"
	/>
</form>

<style>
	form {
		margin: 15px;
	}
</style>
