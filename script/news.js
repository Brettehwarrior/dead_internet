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

function getRandomDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
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

function updateFavicon(emoji) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.font = '28px serif';
    context.fillText(emoji, 0, 28);

    const dataURL = canvas.toDataURL('image/png');

    const favicon = document.getElementById('favicon');
    favicon.href = dataURL;
}

function makeAd() {
    const html = `
        <a href="https://google.com" target="_blank" class="ad-anchor">
            <span class="ad-text-corner">Ad</span>
        </a>`
    const div = document.createElement("div");
    div.className = "ad";
    div.innerHTML = html;
    return div;
}

loadWordList().then(wordList => {
    function getRandomWord() {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    function makeSentence(punctuation=true) {
        const wordCount = 9 + Math.floor(Math.random() * 12);
        let sentence = capitalizeFirstLetter(getRandomWord());
        for (let i = 0; i < wordCount-1; i++)
        {
            sentence += " " + getRandomWord();
        }
        if (punctuation)
            sentence += getRandomPunctuation();
        return sentence;
    }

    function makeParagraph() {
        const sentenceCount = 5 + Math.floor(Math.random() * 7);
        let paragraph = makeSentence();
        for (let i = 0; i < sentenceCount-1; i++)
        {
            paragraph += " " + makeSentence();
        }
        return paragraph;
    }

    function makeParagraphElement() {
        const p = document.createElement("p");
        p.innerHTML = makeParagraph();
        p.className = "content-paragraph";
        return p;
    }

    // Set page title
    const emoji = getRandomEmoji();
    updateFavicon(emoji);
    const title = capitalizeFirstLetter(getRandomWord()) + capitalizeFirstLetter(getRandomWord()) + " News";
    document.title = title;
    document.getElementById("title").innerHTML = emoji + title;
    document.getElementsByTagName("header")[0].style.backgroundColor = getRandomDarkColor();

    // Set page content
    document.getElementById("article-title").innerHTML = makeSentence(false);

    const paragraphCount = 5 + Math.floor(Math.random() * 8);
    for (let i = 0; i < paragraphCount; i++) 
    {
        const container = document.getElementById("article-content");
        const addAd = Math.random();
        if (addAd >= 0.7) {
            const ad = makeAd();
            container.appendChild(ad);
        }
        const p = makeParagraphElement();
        container.appendChild(p);
    }
});

