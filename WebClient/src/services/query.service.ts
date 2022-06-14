function handle (response : Response) : Promise<unknown> {
	if (!response.ok) {
		throw new Error(response.statusText);
	} else {
		return response.json();
	}
}

export { handle };
