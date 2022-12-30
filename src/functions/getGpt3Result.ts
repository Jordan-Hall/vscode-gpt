/* eslint-disable @typescript-eslint/naming-convention */
import { request } from 'https';

export async function getGpt3Result(prompt: string, apiKey: string): Promise<string> {
	const data = JSON.stringify({
		prompt: prompt,
		model: 'text-davinci-003',
		temperature: 0.7,
		max_tokens: 1000,
	});

	const options = {
		hostname: 'api.openai.com',
		port: 443,
		path: '/v1/images/generations',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
			'Content-Length': data.length,
		},
	};

	return new Promise((resolve, reject) => {
		const req = request(options, (res) => {
			if (res.statusCode !== 200) {
				reject(new Error(`Failed to generate image: ${res.statusMessage}`));
			}

			res.on('data', (d) => {
				resolve(d);
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.write(data);
		req.end();
	});
}