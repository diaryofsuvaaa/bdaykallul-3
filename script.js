/* =========================================
   KALLUL — OUR LITTLE UNIVERSE
   PART 1: NAVIGATION & MUSIC
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. SCREEN NAVIGATION
    ===================================== */

    const screens = document.querySelectorAll(".screen");

    function showScreen(screenId) {

        const targetScreen = document.getElementById(screenId);

        if (!targetScreen) {
            console.error("Screen not found:", screenId);
            return;
        }

        screens.forEach(screen => {
            screen.classList.remove("active-screen");
        });

        targetScreen.classList.add("active-screen");

        // Start the new screen at the top.
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    /* Start the journey */

    const startButton = document.getElementById("start-journey");

    if (startButton) {
        startButton.addEventListener("click", () => {
            showScreen("our-story");
        });
    }


    /* Move between screens */

    document.querySelectorAll(".next-screen").forEach(button => {

        button.addEventListener("click", () => {

            const nextScreen = button.dataset.next;

            if (nextScreen) {
                showScreen(nextScreen);
            }

        });

    });


    /* Replay the entire journey */

    const replayButton = document.getElementById("replay-journey");

    if (replayButton) {
        replayButton.addEventListener("click", () => {

            showScreen("welcome");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        });
    }


    /* =====================================
       2. BACKGROUND MUSIC
    ===================================== */

    const music = document.getElementById("background-music");
    const musicButton = document.getElementById("music-toggle");
    const musicPrompt = document.getElementById("music-prompt");

    let musicStarted = false;


    function updateMusicButton() {

        if (!musicButton || !music) return;

        if (music.paused) {
            musicButton.textContent = "♫ Play music";
        } else {
            musicButton.textContent = "♫ Music playing";
        }

    }


    async function playMusic() {

        if (!music) return;

        try {

            await music.play();

            musicStarted = true;

            if (musicPrompt) {
                musicPrompt.hidden = true;
            }

            updateMusicButton();

        } catch (error) {

            console.log("Music needs user interaction.");

            if (musicPrompt) {
                musicPrompt.hidden = false;
            }

            updateMusicButton();

        }

    }


    function pauseMusic() {

        if (!music) return;

        music.pause();
        updateMusicButton();

    }


    /* Attempt autoplay when the website opens.
       Browsers may block autoplay with sound. */

    if (music) {

        music.volume = 0.45;

        playMusic();

    }


    /* Music toggle button */

    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (music.paused) {
                playMusic();
            } else {
                pauseMusic();
            }

        });

    }


    /* Start music after the first user interaction
       if the browser blocked autoplay. */

    document.addEventListener("click", function startMusicAfterInteraction() {

        if (!musicStarted && music && music.paused) {
            playMusic();
        }

    }, { once: true });


    if (music) {

        music.addEventListener("play", updateMusicButton);
        music.addEventListener("pause", updateMusicButton);

    }


    /* =====================================
       3. JOURNEY PROGRESS
    ===================================== */

    const starCount = document.getElementById("star-count");

    let completedGames = 0;

    function updateJourneyProgress() {

        if (starCount) {
            starCount.textContent = completedGames;
        }

    }


    // Other game sections will use this function.
    // It prevents the same game being counted twice.

    const completedGameNames = new Set();

    function completeGame(gameName) {

        if (completedGameNames.has(gameName)) {
            return;
        }

        completedGameNames.add(gameName);

        completedGames = Math.min(completedGames + 1, 3);

        updateJourneyProgress();

    }


    /* =====================================
       4. INITIAL SETUP
    ===================================== */

    updateJourneyProgress();

    console.log("Our Little Universe is ready ♡");


    /* These functions will be used in Parts 2–4. */

    window.universeNavigation = {
        showScreen
    };

    window.universeProgress = {
        completeGame,
        updateJourneyProgress
    };

});
/* =========================================
   PART 2: CATCH THE FIREFLIES
   + CELEBRATION EFFECTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. CELEBRATION EFFECT
    ===================================== */

    const celebrationOverlay =
        document.getElementById("celebration-overlay");

    const celebrationParticles =
        document.getElementById("celebration-particles");

    let celebrationTimer;


    function celebrateGame() {

        if (!celebrationOverlay || !celebrationParticles) {
            return;
        }

        // Clear any previous celebration.
        clearTimeout(celebrationTimer);
        celebrationParticles.innerHTML = "";

        celebrationOverlay.classList.add("active");

        // Create falling flower petals.
        const petals = ["🌸", "🌷", "✿", "❀", "♡"];

        for (let i = 0; i < 35; i++) {

            const petal = document.createElement("span");

            petal.className = "flower-petal";

            petal.textContent =
                petals[Math.floor(Math.random() * petals.length)];

            petal.style.setProperty(
                "--petal-left",
                Math.random() * 100 + "%"
            );

            petal.style.setProperty(
                "--petal-size",
                (14 + Math.random() * 15) + "px"
            );

            petal.style.setProperty(
                "--petal-duration",
                (3.5 + Math.random() * 3) + "s"
            );

            petal.style.setProperty(
                "--petal-delay",
                Math.random() * 1.5 + "s"
            );

            celebrationParticles.appendChild(petal);

        }


        // Create sparkling stars.
        for (let i = 0; i < 18; i++) {

            const sparkle = document.createElement("span");

            sparkle.className = "celebration-sparkle";
            sparkle.textContent = "✦";

            sparkle.style.setProperty(
                "--sparkle-top",
                Math.random() * 90 + "%"
            );

            sparkle.style.setProperty(
                "--sparkle-left",
                Math.random() * 90 + "%"
            );

            sparkle.style.setProperty(
                "--sparkle-size",
                (12 + Math.random() * 18) + "px"
            );

            sparkle.style.animationDelay =
                Math.random() * 1.2 + "s";

            celebrationParticles.appendChild(sparkle);

        }


        // Keep the effect visible briefly.
        celebrationTimer = setTimeout(() => {

            celebrationOverlay.classList.remove("active");

            setTimeout(() => {
                celebrationParticles.innerHTML = "";
            }, 600);

        }, 5500);

    }


    // Make celebration available to the other games.
    window.universeCelebration = {
        celebrateGame
    };


    /* =====================================
       2. FIREFlY GAME ELEMENTS
    ===================================== */

    const fireflies =
        document.querySelectorAll(".catch-firefly");

    const fireflyCount =
        document.getElementById("firefly-count");

    const fireflyMessage =
        document.getElementById("firefly-message");

    const fireflyVictory =
        document.getElementById("firefly-victory");

    const restartFireflies =
        document.getElementById("restart-fireflies");


    let caughtFireflies = 0;
    let fireflyGameFinished = false;


    /* =====================================
       3. UPDATE FIREFlY SCORE
    ===================================== */

    function updateFireflyScore() {

        if (fireflyCount) {
            fireflyCount.textContent =
                caughtFireflies + " / 5";
        }

    }


    /* =====================================
       4. CATCH A FIREFLY
    ===================================== */

    fireflies.forEach(firefly => {

        firefly.addEventListener("click", () => {

            // Don't count the same firefly twice.
            if (
                firefly.classList.contains("caught") ||
                fireflyGameFinished
            ) {
                return;
            }

            firefly.classList.add("caught");
            firefly.disabled = true;

            caughtFireflies++;

            updateFireflyScore();

            if (fireflyMessage) {

                fireflyMessage.textContent =
                    "One little light found its way home ✨";

            }


            // Check if all five have been caught.
            if (caughtFireflies === 5) {

                finishFireflyGame();

            }

        });

    });


    /* =====================================
       5. FIREFlY GAME VICTORY
    ===================================== */

    function finishFireflyGame() {

        fireflyGameFinished = true;

        if (fireflyMessage) {

            fireflyMessage.textContent =
                "You found every little light! ♡";

        }

        if (fireflyVictory) {

            fireflyVictory.hidden = false;

        }

        // Count this game in the journey.
        if (window.universeProgress) {

            window.universeProgress.completeGame("fireflies");

        }

        // Flower petals and sparkles.
        celebrateGame();

    }


    /* =====================================
       6. RESTART FIREFLY GAME
    ===================================== */

    function resetFireflyGame() {

        caughtFireflies = 0;
        fireflyGameFinished = false;

        fireflies.forEach(firefly => {

            firefly.classList.remove("caught");
            firefly.disabled = false;

        });

        if (fireflyVictory) {
            fireflyVictory.hidden = true;
        }

        if (fireflyMessage) {

            fireflyMessage.textContent =
                "Find all five little lights!";

        }

        updateFireflyScore();

    }


    if (restartFireflies) {

        restartFireflies.addEventListener(
            "click",
            resetFireflyGame
        );

    }


    // Set the initial score.
    updateFireflyScore();

    if (fireflyVictory) {
        fireflyVictory.hidden = true;
    }

});
/* =========================================
   PART 3: GROW OUR LITTLE TREE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. TREE ELEMENTS
    ===================================== */

    const tree = document.getElementById("birthday-tree");

    const waterButton = document.getElementById("water-tree");
    const feedButton = document.getElementById("feed-tree");
    const flowerButton = document.getElementById("flower-tree");

    const progressFill = document.getElementById("tree-progress-fill");
    const stageText = document.getElementById("tree-stage-text");
    const treeMessage = document.getElementById("tree-message");

    const treeVictory = document.getElementById("tree-victory");
    const restartTree = document.getElementById("restart-tree");


    /* =====================================
       2. TREE PROGRESS
    ===================================== */

    let treeStage = 0;
    let treeFinished = false;

    const treeStages = [
        {
            progress: 0,
            text: "A little seed is waiting to grow... 🌱"
        },
        {
            progress: 33,
            text: "The seed has received its first drink! 💧"
        },
        {
            progress: 66,
            text: "Our little tree is growing stronger! 🌿"
        },
        {
            progress: 100,
            text: "Look at our beautiful little tree! 🌸"
        }
    ];


    /* =====================================
       3. UPDATE TREE DISPLAY
    ===================================== */

    function updateTree() {

        if (!tree) return;

        tree.classList.remove(
            "stage-one",
            "stage-two",
            "stage-three",
            "stage-four"
        );

        const stageClasses = [
            "stage-one",
            "stage-two",
            "stage-three",
            "stage-four"
        ];

        tree.classList.add(stageClasses[treeStage]);

        if (progressFill) {

            progressFill.style.width =
                treeStages[treeStage].progress + "%";

        }

        if (stageText) {

            stageText.textContent =
                treeStages[treeStage].text;

        }

    }


    /* =====================================
       4. UNLOCK TREE ACTIONS
    ===================================== */

    function updateTreeButtons() {

        if (waterButton) {
            waterButton.disabled = treeStage !== 0;
        }

        if (feedButton) {
            feedButton.disabled = treeStage !== 1;
        }

        if (flowerButton) {
            flowerButton.disabled = treeStage !== 2;
        }

    }


    /* =====================================
       5. WATER THE TREE
    ===================================== */

    if (waterButton) {

        waterButton.addEventListener("click", () => {

            if (treeStage !== 0 || treeFinished) return;

            treeStage = 1;

            if (treeMessage) {

                treeMessage.textContent =
                    "A little water makes everything possible. 💧";

            }

            updateTree();
            updateTreeButtons();

        });

    }


    /* =====================================
       6. FEED THE TREE
    ===================================== */

    if (feedButton) {

        feedButton.addEventListener("click", () => {

            if (treeStage !== 1 || treeFinished) return;

            treeStage = 2;

            if (treeMessage) {

                treeMessage.textContent =
                    "With a little care, our tree grows stronger. 🌿";

            }

            updateTree();
            updateTreeButtons();

        });

    }


    /* =====================================
       7. HELP THE TREE BLOOM
    ===================================== */

    if (flowerButton) {

        flowerButton.addEventListener("click", () => {

            if (treeStage !== 2 || treeFinished) return;

            treeStage = 3;

            treeFinished = true;

            if (treeMessage) {

                treeMessage.textContent =
                    "A little love made it bloom! 🌸";

            }

            updateTree();
            updateTreeButtons();

            finishTreeGame();

        });

    }


    /* =====================================
       8. TREE VICTORY
    ===================================== */

    function finishTreeGame() {

        if (treeVictory) {
            treeVictory.hidden = false;
        }

        if (window.universeProgress) {

            window.universeProgress.completeGame("tree");

        }

        if (window.universeCelebration) {

            window.universeCelebration.celebrateGame();

        }

    }


    /* =====================================
       9. RESTART TREE GAME
    ===================================== */

    function resetTreeGame() {

        treeStage = 0;
        treeFinished = false;

        if (treeVictory) {
            treeVictory.hidden = true;
        }

        if (treeMessage) {

            treeMessage.textContent =
                "Let's take care of our little tree. ♡";

        }

        updateTree();
        updateTreeButtons();

    }


    if (restartTree) {

        restartTree.addEventListener(
            "click",
            resetTreeGame
        );

    }


    /* =====================================
       10. INITIAL TREE SETUP
    ===================================== */

    updateTree();
    updateTreeButtons();

    if (treeVictory) {
        treeVictory.hidden = true;
    }

});
/* =========================================
   PART 4: BIRTHDAY CAKE STUDIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. CAKE ELEMENTS
    ===================================== */

    const cake = document.getElementById("birthday-cake");

    const cakeMessageInput =
        document.getElementById("cake-custom-message");

    const cakeMessageDisplay =
        document.getElementById("cake-message-display");

    const applyMessageButton =
        document.getElementById("apply-cake-message");

    const presentCakeButton =
        document.getElementById("present-cake");

    const resetCakeButton =
        document.getElementById("reset-cake");

    const cakeVictory =
        document.getElementById("cake-victory");

    const frostingOptions =
        document.querySelectorAll(".frosting-option");

    const decorationOptions =
        document.querySelectorAll(".decoration-option");

    const cakeDecorations =
        document.querySelectorAll(".cake-decoration");


    /* =====================================
       2. CAKE SETTINGS
    ===================================== */

    let selectedFrosting = "blue";
    let selectedDecoration = "♡";
    let cakePresented = false;

    const defaultCakeMessage = "Happy Birthday!";


    /* =====================================
       3. CHANGE FROSTING COLOUR
    ===================================== */

    frostingOptions.forEach(button => {

        button.addEventListener("click", () => {

            if (cakePresented || !cake) return;

            selectedFrosting = button.dataset.frosting;

            cake.classList.remove(
                "frosting-blue",
                "frosting-pink",
                "frosting-cream",
                "frosting-brown"
            );

            cake.classList.add(
                "frosting-" + selectedFrosting
            );

            frostingOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

        });

    });


    /* =====================================
       4. CHANGE CAKE DECORATIONS
    ===================================== */

    function updateCakeDecorations() {

        cakeDecorations.forEach((decoration, index) => {

            const symbols = [
                selectedDecoration,
                "✧",
                selectedDecoration
            ];

            decoration.textContent = symbols[index];

        });

    }


    decorationOptions.forEach(button => {

        button.addEventListener("click", () => {

            if (cakePresented) return;

            selectedDecoration = button.dataset.decoration;

            decorationOptions.forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            updateCakeDecorations();

        });

    });


    /* =====================================
       5. CUSTOM CAKE MESSAGE
    ===================================== */

    function applyCakeMessage() {

        if (!cakeMessageInput || !cakeMessageDisplay) {
            return;
        }

        const customMessage =
            cakeMessageInput.value.trim();

        cakeMessageDisplay.textContent =
            customMessage || defaultCakeMessage;

    }


    if (applyMessageButton) {

        applyMessageButton.addEventListener(
            "click",
            applyCakeMessage
        );

    }


    if (cakeMessageInput) {

        cakeMessageInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();
                applyCakeMessage();

            }

        });

    }


    /* =====================================
       6. PRESENT THE FINISHED CAKE
    ===================================== */

    if (presentCakeButton) {

        presentCakeButton.addEventListener("click", () => {

            if (cakePresented) return;

            cakePresented = true;

            applyCakeMessage();

            if (cakeVictory) {
                cakeVictory.hidden = false;
            }

            if (presentCakeButton) {
                presentCakeButton.disabled = true;
                presentCakeButton.textContent = "Cake presented ♡";
            }

            // Count the third completed game.
            if (window.universeProgress) {

                window.universeProgress.completeGame("cake");

            }

            // Final game celebration.
            if (window.universeCelebration) {

                window.universeCelebration.celebrateGame();

            }

        });

    }


    /* =====================================
       7. RESET CAKE STUDIO
    ===================================== */

    function resetCakeStudio() {

        cakePresented = false;
        selectedFrosting = "blue";
        selectedDecoration = "♡";

        if (cake) {

            cake.classList.remove(
                "frosting-pink",
                "frosting-cream",
                "frosting-brown"
            );

            cake.classList.add("frosting-blue");

        }

        // Restore default frosting selection.
        frostingOptions.forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.frosting === "blue"
            );

        });


        // Restore default decoration selection.
        decorationOptions.forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.decoration === "♡"
            );

        });

        updateCakeDecorations();


        // Restore the original message.
        if (cakeMessageInput) {

            cakeMessageInput.value = defaultCakeMessage;

        }

        if (cakeMessageDisplay) {

            cakeMessageDisplay.textContent = defaultCakeMessage;

        }


        // Hide victory message.
        if (cakeVictory) {
            cakeVictory.hidden = true;
        }

        if (presentCakeButton) {

            presentCakeButton.disabled = false;
            presentCakeButton.textContent = "Present the cake ♡";

        }

    }


    if (resetCakeButton) {

        resetCakeButton.addEventListener(
            "click",
            resetCakeStudio
        );

    }


    /* =====================================
       8. INITIAL CAKE SETUP
    ===================================== */

    resetCakeStudio();

});
/* =========================================
   PART 5: FINAL WEBSITE SETUP
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. MAKE WELCOME THE FIRST SCREEN
    ===================================== */

    const allScreens = document.querySelectorAll(".screen");

    // Ensure only the welcome screen is visible initially.
    allScreens.forEach(screen => {

        screen.classList.remove("active-screen");

        screen.setAttribute("aria-hidden", "true");

    });

    const welcomeScreen = document.getElementById("welcome");

    if (welcomeScreen) {

        welcomeScreen.classList.add("active-screen");

        welcomeScreen.setAttribute("aria-hidden", "false");

    }


    /* =====================================
       2. KEEP SCREEN ACCESSIBILITY UPDATED
    ===================================== */

    const originalShowScreen =
        window.universeNavigation?.showScreen;

    if (originalShowScreen) {

        window.universeNavigation.showScreen = function(screenId) {

            originalShowScreen(screenId);

            allScreens.forEach(screen => {

                screen.setAttribute(
                    "aria-hidden",
                    screen.classList.contains("active-screen")
                        ? "false"
                        : "true"
                );

            });

        };

    }


    /* =====================================
       3. CHECK REQUIRED WEBSITE ELEMENTS
    ===================================== */

    const requiredElements = [
        "welcome",
        "our-story",
        "our-memories",
        "enchanted-forest",
        "firefly-game",
        "tree-garden",
        "cake-studio",
        "birthday-letter",
        "finale",
        "firefly-play-area",
        "birthday-tree",
        "birthday-cake",
        "celebration-overlay"
    ];

    const missingElements = [];

    requiredElements.forEach(id => {

        if (!document.getElementById(id)) {

            missingElements.push(id);

        }

    });


    if (missingElements.length > 0) {

        console.warn(
            "Some website elements are missing:",
            missingElements
        );

    } else {

        console.log(
            "All main website sections are present! ♡"
        );

    }


    /* =====================================
       4. HANDLE MISSING MUSIC FILE
    ===================================== */

    const backgroundMusic =
        document.getElementById("background-music");

    const musicButton =
        document.getElementById("music-toggle");

    if (backgroundMusic) {

        backgroundMusic.addEventListener("error", () => {

            console.warn(
                "Music file could not be loaded. Check the music folder."
            );

            if (musicButton) {

                musicButton.textContent = "♫ Music unavailable";

                musicButton.disabled = true;

            }

        });

    }


    /* =====================================
       5. CHECK GAME VICTORY PANELS
    ===================================== */

    const victoryPanels = [
        "firefly-victory",
        "tree-victory",
        "cake-victory"
    ];

    victoryPanels.forEach(id => {

        const panel = document.getElementById(id);

        if (panel) {

            panel.hidden = true;

        }

    });


    /* =====================================
       6. FINAL CONSOLE MESSAGE
    ===================================== */

    console.log(
        "Kallul — Our Little Universe is ready! ✨"
    );

});
