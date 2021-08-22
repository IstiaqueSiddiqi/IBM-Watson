import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const TextToSpeechV1 = await (await import('ibm-watson/text-to-speech/v1')).default;
        const textToSpeech = new TextToSpeechV1({ version: '2021-07-17' });
        const synthesizeParams = {
            text: req.query.text.toString(),
            accept: 'audio/mp3',
            voice: 'en-US_MichaelV3Voice'
        };

        let { result, status, statusText, headers } = await textToSpeech.synthesize(synthesizeParams);

        res
            .setHeader('Cache-Control', 'public, max-age=86400')
            .status(status)
            .send(result)
    } catch (err) {
        console.error('Error creating service client: ', err);
        res.status(500).json({ error: err });
    }
}
