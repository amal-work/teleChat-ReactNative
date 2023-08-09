declare module 'react-native-dotenv' {
	interface EnvVariables {
		readonly API_ROOT: string;
	}

	const env: EnvVariables;
	export = env;
}
