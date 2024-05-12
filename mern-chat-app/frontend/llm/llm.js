export async function getLLMResponse(prompt) {
    return new Promise((resolve) => {
    const timeout = Math.random() * (15000 - 5000) + 5000;
    setTimeout(() => {
    resolve('This is a mock response from the LLM based on user input');
    }, timeout);
    });
    };
    // Example usage
    getLLMResponse("Hello, how are you?")
    .then(response => console.log(response));