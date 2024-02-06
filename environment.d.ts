// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			CLIENT_ID: string;
			PUBLIC_KEY: string;
			APP_ID: string;
			GUILD_ID: string;
			INSTANCE_ID:string;
			REGION:string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
