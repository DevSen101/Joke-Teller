const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

// Disable/Enable Button
function toogleButton(){
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke){
    console.log(`tell me : ${joke}`);
         VoiceRSS.speech({
            key: '2218b28020494c6983189cdc9e85ae2c',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });

}


// Get Jokes From Joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data =  await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else {
            joke = data.joke
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toogleButton();
       
    }catch(error){
        console.log(`Oops! ${error}`);
    }
}


// Event Listener
button.addEventListener('click' , getJokes);
audioElement.addEventListener('ended', toogleButton);