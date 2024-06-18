
function getRandomDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
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
        <a href="https://www.google.com/search?client=firefox-b-d&sca_esv=8eb2b271edd6fc02&sca_upv=1&sxsrf=ADLYWIK--K07F8PV_fk5aaCh0FEIQKIx6w:1718720786440&q=yummy+bread+mmm+yum+yum+i+want+some+bread+show+me+pictures+of+good+bread&udm=2&source=univ&fir=ErQNgfHiFNn7DM%252C2s49rWbI6BdovM%252C_%253BAZ-hJulATQ4F9M%252C7miAq_epdCTsTM%252C_%253B6eW79_P2ghYi8M%252C56G0rDHfhqfldM%252C_%253BVL9pFflUylIPrM%252CEhkZN7ugZLnVNM%252C_%253BJE7pr0JR5JxqLM%252Cfvr--XsrWjmgEM%252C_%253BErHQcC7KaE2FRM%252CEsFjkk94eIBHqM%252C_%253BmQSTTKG3oLsKRM%252C-j2zvBGZWqwDtM%252C_%253Bt1SRfcX2jC5u8M%252C-I3T8OP0hPxNdM%252C_%253BgzMJPjfPUb7tfM%252CYgXnJk5PbiykQM%252C_%253BJROhXWSzs5hSZM%252CFrmQbhQEXlvNiM%252C_&usg=AI4_-kTPSIGM6UN3T9kLbwUCX-hPERP0HA&biw=918&bih=990&dpr=1" target="_blank" class="ad-anchor">
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

