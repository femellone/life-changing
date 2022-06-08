/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
	interface ImportMetaEnv {
		readonly VITE_FIREBASE_CONFIG: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}
