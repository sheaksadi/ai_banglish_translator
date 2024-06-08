import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";
import * as dotenv from 'dotenv'
dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


export default defineEventHandler(async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': 'Same-Origin',
        'crossOriginResourcePolicy': 'same-origin',
        'crossOriginOpenerPolicy': 'same-origin',
        'crossOriginEmbedderPolicy': 'require-corp',
        'contentSecurityPolicy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        'X-XSS-Protection': 1
    }
    setHeaders(event, headers)
    const body = await readBody(event)
    const messages: ChatCompletionRequestMessage[] = body.messages

    const result = await openai.createChatCompletion({
         model: 'gpt-4-turbo',
        //model: 'gpt-3.5-turbo',
        messages:messages
    })
    console.log(result.data.choices[0])
    return result.data.choices[0]
})
