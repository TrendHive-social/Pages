// Function to check grammar using LanguageTool API
function checkGrammar() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');
    const suggestionsList = document.getElementById('suggestionsList');
    const correctedSentenceDiv = document.getElementById('correctedSentence');
    
    if (inputText.trim() === '') {
        alert("Please enter some text to check.");
        return;
    }

    // Clear previous suggestions and corrected sentence
    suggestionsList.innerHTML = '';
    correctedSentenceDiv.innerHTML = '';
    outputDiv.style.display = 'none';
    document.getElementById('result').style.display = 'none';

    // API URL for LanguageTool
    const apiUrl = 'https://api.languagetool.org/v2/check';

    // Prepare request data
    const data = {
        text: inputText,
        language: 'en-US'
    };

    // Make the request to the LanguageTool API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // If there are no mistakes, show a message
        if (data.matches.length === 0) {
            outputDiv.style.display = 'block';
            suggestionsList.innerHTML = '<li>No grammar mistakes found.</li>';
            document.getElementById('result').style.display = 'none';
        } else {
            outputDiv.style.display = 'block';
            document.getElementById('result').style.display = 'block';

            // Display the list of suggested corrections
            data.matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Issue:</strong> ${match.message}<br>
                    <strong>Context:</strong> ${match.context.text}<br>
                    <strong>Suggestions:</strong> ${match.replacements.map(rep => rep.value).join(', ')}
                `;
                suggestionsList.appendChild(listItem);
            });

            // Generate the corrected sentence
            let correctedText = inputText;
            let offsetAdjustment = 0;

            // Apply each correction
            data.matches.forEach(match => {
                const start = match.offset + offsetAdjustment;
                const end = start + match.length;
                const replacement = match.replacements[0].value;

                // Replace the error with the first suggested replacement
                correctedText = correctedText.slice(0, start) + replacement + correctedText.slice(end);
                
                // Adjust the offset for subsequent corrections
                offsetAdjustment += (replacement.length - match.length);
            });

            // Display the corrected sentence
            correctedSentenceDiv.innerHTML = correctedText;
        }
    })
    .catch(error => {
        console.error("Error checking grammar:", error);
        alert("Error checking grammar. Please try again later.");
    });
}
