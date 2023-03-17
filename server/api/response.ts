import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";
import * as dotenv from 'dotenv'
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const messages: ChatCompletionRequestMessage[] = body.messages

    const result = await openai.createChatCompletion({
        // model: 'gpt-4',
        model: 'gpt-3.5-turbo',
        messages:messages
    })
    console.log(result.data.choices[0])
    return result.data.choices[0]
})
