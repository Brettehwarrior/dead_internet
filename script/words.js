async function loadWordList() {
    const response = await fetch("eng-ca_web_2020_10K-words_pruned.txt");
    if (!response.ok)
        throw new Error("Could not fetch text file ");

    const text = await response.text();
    const lines = text.trim().split("\n");
    const wordList = [];

    lines.forEach(line => {
        const line_data = line.trim().split("\t");
        if (line_data.length === 3) {
            const word = line_data[1];

            if (!word.includes(" ") && !/[^a-zA-Z]/.test(word))
            {
                const frequency = parseInt(line_data[2]);
                // This will lead to a large list, but we suffer for fashion
                for (let i = 0; i < frequency; i++)
                    wordList.push(word)
            }
        }
    });
    return wordList;
}


function getRandomEmoji() {
    const emojiCategories = [
        { start: 0x1F300, end: 0x1F3FA },   
        { start: 0x1F400, end: 0x1F4FD },   
        //{ start: 0x1F600, end: 0x1F64F },   // Mostly faces
        { start: 0x1F680, end: 0x1F6C5 },   
        { start: 0x1F910, end: 0x1F96B },   
        { start: 0x1F980, end: 0x1F9D9 }    
    ];

    function getRandomEmojiInRange(start, end) {
        const range = end - start + 1;
        const codePoint = start + Math.floor(Math.random() * range);
        return String.fromCodePoint(codePoint);
    }

    const randomCategory = emojiCategories[Math.floor(Math.random() * emojiCategories.length)];
    return getRandomEmojiInRange(randomCategory.start, randomCategory.end);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomPunctuation() {
    const punctuation = [".",".",".",".",".",".",".",".","?","?","!",];
    return punctuation[Math.floor(Math.random() * punctuation.length)];
}
