export interface LoginResponse {
	data: {
		MAGIC: string;
		access_token: string;
		idmedewerker: number;
		login: string;
	};
	status: number;
}

export interface ListResponse {
	data: {
		error?: string;
		type?: string;
		message?: string;
		list?: Array<{
			naam: string;
			firstname: string;
			functienaam: string;
			email: string;
			adres: string;
		}>;
	};
	status: number;
}

export interface UserData {
	naam: string;
	firstname: string;
	functienaam: string;
	email: string;
	adres: string;
}

export interface CallServerFunction {
	(api: string, params: object, access_token?: string): Promise<object>;
}
