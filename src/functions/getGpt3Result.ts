/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

export async function getGpt3Result(prompt: string, apiKey: string): Promise<string> {
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/completions',
			{
				prompt: prompt,
				model: 'text-davinci-003',
				temperature: 0.7,
				max_tokens: 1000,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`,
				},
			}
		);

		return response.data.choices[0].text;
	} catch (e) {
		debugger;
		console.error(e);
		return null;
	}

}