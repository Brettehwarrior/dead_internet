const password = "password";
let proceed = false;
while (!proceed) {
    const t = prompt("Only the worthiest of net navigators may proceed. If you are worthy, you have found the password.");
    if (t==="d34d") {
        proceed = true;
    }
}

// window.stop();