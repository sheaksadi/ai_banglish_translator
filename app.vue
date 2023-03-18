<template>
  <div>
    <loading-bar :loading="loading.value" class="absolute top-0 left-0"></loading-bar>
    <div class="h-screen bg-gray-800 items-center  justify-center flex flex-col">
      <h1 class="text-blue-300 text-4xl md:text-6xl mb-28 title">BANGLISH CONVERTER</h1>

      <div class="flex items-center justify-center w-full flex-col">

      <textarea spellcheck="false" class="   input text-blue-300 w-5/6 lg:w-3/4 xl:w-1/2" v-model="message.value" @input="evalLanguage"
                placeholder="Convert banglish to bangla or convert bangla to banglish"
                @keydown.enter="sendMessage(message.value)"
                maxlength="2000"
      />
        <div class="w-5/6 lg:w-3/4 xl:w-1/2 flex justify-end items-center mt-2">
          <select v-model="selectedOption.value" class="input w-40 text-blue-400 ">
            <option disabled value="">Please select one</option>
            <option value="BtoE">Bangla to Banglish</option>
            <option value="EtoB">Banglish to Bangla</option>

          </select>

          <button
              class=" w-36 input  capitalize text-2xl  ml-2 font-bold hover:ring-purple-600 hover:ring-2 text-blue-400"
              @click="sendMessage(message.value)">
            Convert
          </button>
        </div>


      </div>
      <div class="container w-5/6 lg:w-3/4 xl:w-1/2   min-h-20 mt-4 relative">

        <button v-if="translation.value"
                class="absolute top-1 right-1 bg-transparent ring-1 ring-purple-600 text-blue-400 w-16 h-6 bg-amber-300 m-0  rounded"
                @click="copyTranslation">Copy
        </button>


        <h1 class="text-amber-50 mt-4 mx-2 my-2">{{ translation.value }}</h1>
      </div>


    </div>
  </div>



  <!--    <div v-for="message in messages.value">-->
  <!--      <div v-if="message.role !== 'system'">-->
  <!--        <div v-if="message.role === 'assistant'" class="flex">-->
  <!--          <div class="bg-gray-100 p-2 mt-1 rounded-2xl">-->
  <!--            {{ message.content }}-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div v-if="message.role === 'user'" class="flex">-->
  <!--          <div class="bg-indigo-100 p-2 mt-1 rounded-2xl">-->
  <!--            {{ message.content }}-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="py-4">-->
  <!--      <input class="bg-gray-100 p-2 rounded-2xl" v-model="message.value" @keydown.enter="sendMessage(message.value)"/>-->
  <!--      <button class="inline-flex items-center rounded-md bg-white ml-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="sendMessage(message.value)">Send</button>-->
  <!--    </div>-->

</template>

<script setup>


import LoadingBar from "./components/loading-bar";

let loading = reactive({
  value: false,
})
let message = reactive({
  value: '',
})
let selectedOption = reactive({
  value: '',
})
let translation = reactive({
  value: "",
})

const alphabets = reactive({
  bengali: ["ঀ","ঁ","ং","ঃ","঄","অ","আ","ই","ঈ","উ","ঊ","ঋ","ঌ","঍","঎","এ","ঐ","঑","঒","ও","ঔ","ক","খ","গ","ঘ","ঙ","চ","ছ","জ","ঝ","ঞ","ট","ঠ","ড","ঢ","ণ","ত","থ","দ","ধ","ন","঩","প","ফ","ব","ভ","ম","য","র","঱","ল","঳","঴","঵","শ","ষ","স","হ","঺","঻","়","ঽ","া","ি","ী","ু","ূ","ৃ","ৄ","৅","৆","ে","ৈ","৉","৊","ো","ৌ","্","ৎ","৏","৐","৑","৒","৓","৔","৕","৖","ৗ","৘","৙","৚","৛","ড়","ঢ়","৞","য়","ৠ","ৡ","ৢ","ৣ","৤","৥","০","১","২","৩","৪","৫","৬","৭","৮","৯","ৰ","ৱ","৲","৳","৴","৵","৶","৷","৸","৹","৺","৻","ৼ","৽","৾","৿"],
  english: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]
})


const messages = reactive({
  value: {
    BtoE: [{
      "role": "system",
      "content": "I want you to write the following text in Bengali but using English characters . Do not translate anything. Do not provide any explanations in your responses. My first sentence is:  "
    }],
    EtoB: [{
      "role": "system",
      "content": "I want you to write the following text in Bengali. Do not translate anything. Do not provide any explanations in your responses. My first sentence is: "
    }],
  }

  ,
})

async function copyTranslation() {
  try {
    await navigator.clipboard.writeText(translation.value);
    alert('Copied');
  } catch ($e) {
    alert('Cannot copy');
  }
}

function evalLanguage() {
  let eng = 0
  let bng = 0

  for (let i = 0; i < 10; i++) {
    if (message.value.length > i){

      if (alphabets.english.includes(message.value.charAt(i)) ){
        eng++
      }
      if (alphabets.bengali.includes(message.value.charAt(i)) ){
        bng++
      }

    }
  }
  if (eng > bng){
    selectedOption.value = "EtoB"
  }
  if (eng < bng){
    selectedOption.value = "BtoE"
  }


}

async function sendMessage(message) {

  if (message === ""){
    return
  }
  if (selectedOption.value === ""){
    return
  }
  loading.value = true
  messages.value[selectedOption.value][0].content = messages.value[selectedOption.value][0].content + "' " + message + " '."

  const responseMsg = await $fetch('/api/response', {
    method: 'POST',
    body: {messages: messages.value[selectedOption.value]}
  })
  loading.value = false
  translation.value = responseMsg.message.content

  messages.value = {
    BtoE: [{
      "role": "system",
      "content": "I want you to write the following text in Bengali but using English characters . Do not translate anything. Do not provide any explanations in your responses. My first sentence is:  "
    }],
    EtoB: [{
      "role": "system",
      "content": "I want you to write the following text in Bengali. Do not provide any explanations in your responses. Do not provide any translations in your responses My first sentence is: "
    }],
  }

}




</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');
.title{
  font-family: 'Secular One', sans-serif;
}
</style>