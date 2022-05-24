<script>
	const personajes = [];
</script>

<form
	on:submit={(e) => {
		e.preventDefault();
	}}
>
	<input type="text" name="name" placeholder="Name" />
	<input type="text" name="email" placeholder="Email" required autocomplete="off" />
	<input type="submit" value="Submit" />
</form>

<style>
	form {
		margin: 15px;
	}
</style>
