// =========================================================
// FIZZ — INTERACTIVE EXPERIENCE
// CLEAN FINAL JAVASCRIPT
// =========================================================

gsap.registerPlugin(ScrollTrigger);


// =========================================================
// ELEMENTS
// =========================================================

const sceneOne = document.querySelector(".scene-one");
const sceneTwo = document.querySelector(".scene-two");
const sceneThree = document.querySelector(".scene-three");
const sceneFour = document.querySelector(".scene-four");

const sceneNumber = document.querySelector(".scene-number");
const progressFill = document.querySelector(".progress-fill");

const core = document.querySelector(".core");
const coreLetter = document.querySelector(".core-letter");

const coreState = document.querySelector("#coreState");
const coreEnergy = document.querySelector("#coreEnergy");

const choices = document.querySelectorAll(".choice");
const choiceMessage = document.querySelector("#choiceMessage");

const resetButton = document.querySelector("#resetButton");


// =========================================================
// GLOBAL STATE
// =========================================================

let isCoreEngaged = false;
let currentMode = "create";


// =========================================================
// INITIAL STATES
// =========================================================

gsap.set(sceneTwo, {
    autoAlpha: 0
});

gsap.set(sceneThree, {
    autoAlpha: 0
});

gsap.set(sceneFour, {
    autoAlpha: 0
});


// =========================================================
// INTRO ANIMATION
// =========================================================

const intro = gsap.timeline({
    defaults: {
        ease: "power3.out"
    }
});

intro
    .from(".navbar", {
        opacity: 0,
        y: -25,
        duration: 0.8
    })

    .from(".eyebrow", {
        opacity: 0,
        y: 25,
        duration: 0.7
    }, "-=0.4")

    .from(".hero-copy h1", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.3")

    .from(".intro-text", {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, "-=0.6")

    .from(".fizz-choice", {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, "-=0.4")

    .from(".choice-message", {
        opacity: 0,
        y: 12,
        duration: 0.5
    }, "-=0.35")

    .from(".stats > div", {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.6
    }, "-=0.35")

    .from(".visual", {
        opacity: 0,
        scale: 0.65,
        rotation: -15,
        duration: 1.3,
        ease: "back.out(1.4)"
    }, "-=1");


// =========================================================
// FLOATING PARTICLES
// =========================================================

gsap.to(".particle", {
    y: -12,
    x: 7,
    duration: 2.5,
    repeat: -1,
    yoyo: true,

    stagger: {
        each: 0.25,
        from: "random"
    },

    ease: "sine.inOut"
});


// =========================================================
// MASTER SCROLL TIMELINE
// =========================================================

const scrollTl = gsap.timeline({

    scrollTrigger: {
    id: "fizzScroll",

    trigger: ".experience",

    start: "top top",
    end: "bottom bottom",

    scrub: 1.15,

    onUpdate: (self) => {

            const progress = self.progress;
            const time = scrollTl.time();


            // -----------------------------------------
            // Progress bar
            // -----------------------------------------

            if (progressFill) {

                progressFill.style.height =
                    `${progress * 100}%`;

            }


            // -----------------------------------------
            // Scene counter
            // Based on actual timeline time
            // -----------------------------------------

            let scene = 1;

if (time >= 3.05) {
    scene = 4;
}
else if (time >= 2.05) {
    scene = 3;
}
else if (time >= 1.05) {
    scene = 2;
}


            if (sceneNumber) {

                sceneNumber.textContent =
                    `0${scene} / 04`;

            }


            // -----------------------------------------
            // Energy state
            // -----------------------------------------

            updateEnergy(time);

        }

    }

});


// =========================================================
// SCENE LABELS
// =========================================================

scrollTl.addLabel("scene1", 0);


// =========================================================
// SCENE 01
// =========================================================

// Hero exits
scrollTl.to(".hero-copy", {

    y: -140,
    opacity: 0,

    duration: 0.8,

    ease: "none"

}, 0.68);


// Stats exit
scrollTl.to(".stats", {

    y: 70,
    opacity: 0,

    duration: 0.8,

    ease: "none"

}, 0.68);


// Core movement
scrollTl.to(".core", {

    x: -110,
    y: -40,

    scale: 0.86,

    rotation: 120,

    duration: 1,

    ease: "none"

}, 0);


// Orbit 1
scrollTl.to(".orbit-one", {

    x: -90,
    y: -30,

    scale: 0.9,

    rotation: 120,

    duration: 1,

    ease: "none"

}, 0);


// Orbit 2
scrollTl.to(".orbit-two", {

    x: -80,
    y: -30,

    scale: 0.92,

    rotation: -100,

    duration: 1,

    ease: "none"

}, 0);


// Orbit 3
scrollTl.to(".orbit-three", {

    x: -70,
    y: -20,

    scale: 0.95,

    rotation: 150,

    duration: 1,

    ease: "none"

}, 0);


// =========================================================
// SCENE 01 → SCENE 02
// =========================================================

scrollTl.addLabel("scene2", 1.05);


scrollTl.to(sceneOne, {

    autoAlpha: 0,

    duration: 0.12

}, 1);


scrollTl.to(sceneTwo, {

    autoAlpha: 1,

    duration: 0.15

}, 1.05);


scrollTl.fromTo(

    ".scene-two .scene-copy",

    {
        x: 90,
        opacity: 0
    },

    {
        x: 0,
        opacity: 1,

        duration: 0.4,

        ease: "power3.out"
    },

    1.05

);


// =========================================================
// SCENE 02
// =========================================================

scrollTl.to(".core", {

    x: 0,
    y: -85,

    scale: 0.96,

    rotation: 270,

    duration: 1,

    ease: "none"

}, 1);


scrollTl.to(".orbit-one", {

    x: 15,
    y: -65,

    scale: 1,

    rotation: 300,

    duration: 1,

    ease: "none"

}, 1);


scrollTl.to(".orbit-two", {

    x: 20,
    y: -75,

    scale: 1.04,

    rotation: 230,

    duration: 1,

    ease: "none"

}, 1);


scrollTl.to(".orbit-three", {

    x: 10,
    y: -55,

    scale: 1.03,

    rotation: 340,

    duration: 1,

    ease: "none"

}, 1);


// =========================================================
// SCENE 02 → SCENE 03
// =========================================================

scrollTl.addLabel("scene3", 2.05);


scrollTl.to(sceneTwo, {

    autoAlpha: 0,

    duration: 0.12

}, 2);


scrollTl.to(sceneThree, {

    autoAlpha: 1,

    duration: 0.15

}, 2.05);


scrollTl.fromTo(

    ".scene-three .scene-copy",

    {
        y: 100,
        opacity: 0
    },

    {
        y: 0,
        opacity: 1,

        duration: 0.4,

        ease: "power3.out"
    },

    2.05

);


// =========================================================
// SCENE 03 — TRANSFORM
// BIG WOW MOMENT
// =========================================================

// Core expands
scrollTl.to(".core", {

    x: 70,
    y: -105,

    scale: 1.32,

    rotation: 600,

    duration: 1,

    ease: "power2.inOut"

}, 2);


// Core brightness
scrollTl.to(".core", {

    filter: "brightness(1.22)",

    duration: 0.45,

    ease: "power2.out"

}, 2.15);


// Core letter reacts
scrollTl.to(".core-letter", {

    scale: 1.18,

    rotation: 25,

    duration: 0.55,

    ease: "back.out(1.6)"

}, 2.1);


// Orbit 1
scrollTl.to(".orbit-one", {

    x: 95,
    y: -110,

    scale: 1.50,

    rotation: 540,

    opacity: 0.95,

    duration: 1,

    ease: "power2.inOut"

}, 2);


// Orbit 2
scrollTl.to(".orbit-two", {

    x: 110,
    y: -95,

    scale: 1.48,

    rotation: 450,

    opacity: 0.82,

    duration: 1,

    ease: "power2.inOut"

}, 2);


// Orbit 3
scrollTl.to(".orbit-three", {

    x: 90,
    y: -85,

    scale: 1.42,

    rotation: 630,

    opacity: 0.72,

    duration: 1,

    ease: "power2.inOut"

}, 2);


// =========================================================
// PARTICLE BURST
// =========================================================

scrollTl.to(".p1", {

    x: -170,
    y: -190,

    scale: 3.2,

    opacity: 1,

    duration: 0.8,

    ease: "power3.out"

}, 2.15);


scrollTl.to(".p2", {

    x: -190,
    y: 160,

    scale: 2.8,

    opacity: 1,

    duration: 0.8,

    ease: "power3.out"

}, 2.15);


scrollTl.to(".p3", {

    x: 170,
    y: -175,

    scale: 3.2,

    opacity: 1,

    duration: 0.8,

    ease: "power3.out"

}, 2.15);


scrollTl.to(".p4", {

    x: 195,
    y: 150,

    scale: 2.8,

    opacity: 1,

    duration: 0.8,

    ease: "power3.out"

}, 2.15);


scrollTl.to(".p5", {

    x: 175,
    y: -105,

    scale: 2.8,

    opacity: 1,

    duration: 0.8,

    ease: "power3.out"

}, 2.15);


// Core glow peak
scrollTl.to(".core", {

    boxShadow:
        "0 0 80px rgba(255, 90, 31, 0.45), 0 0 180px rgba(255, 90, 31, 0.18)",

    duration: 0.35,

    ease: "power2.out"

}, 2.25);


// Core settles
scrollTl.to(".core", {

    filter: "brightness(1)",

    duration: 0.4,

    ease: "power2.out"

}, 2.65);


// =========================================================
// SCENE 03 → SCENE 04
// =========================================================

scrollTl.addLabel("scene4", 3.05);

scrollTl.to(sceneThree, {
    autoAlpha: 0,
    duration: 0.12
}, 3);

scrollTl.to(sceneFour, {
    autoAlpha: 1,
    duration: 0.15
}, 3.05);


// Scene 4 main copy
scrollTl.fromTo(
    ".final-copy",
    {
        x: -90,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
    },
    3.05
);


// =========================================================
// FINAL TAGLINE ANIMATION
// =========================================================

scrollTl.fromTo(
    ".final-tagline",
    {
        y: 22,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
    },
    3.42
);


// Reset button entrance
scrollTl.fromTo(
    "#resetButton",
    {
        y: 18,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out"
    },
    3.58
);


// =========================================================
// SCENE 04 — FINAL CORE
// =========================================================

scrollTl.to(".core", {
    x: -20,
    y: -65,
    scale: 0.70,
    rotation: 720,
    opacity: 1,
    duration: 1,
    ease: "none"
}, 3);

scrollTl.to(".orbit-one", {
    x: -20,
    y: -55,
    scale: 0.84,
    rotation: 650,
    opacity: 0.65,
    duration: 1,
    ease: "none"
}, 3);

scrollTl.to(".orbit-two", {
    x: -25,
    y: -55,
    scale: 0.87,
    rotation: 520,
    opacity: 0.55,
    duration: 1,
    ease: "none"
}, 3);

scrollTl.to(".orbit-three", {
    x: -15,
    y: -45,
    scale: 0.84,
    rotation: 700,
    opacity: 0.45,
    duration: 1,
    ease: "none"
}, 3);


// Final atmosphere
scrollTl.to(".grid", {
    opacity: 0.45,
    duration: 0.6
}, 3.2);


// =========================================================
// IMPORTANT — FINAL SNAP POINT
// =========================================================



// =========================================================
// FINAL TAGLINE ANIMATION
// =========================================================

scrollTl.fromTo(

    ".final-tagline",

    {
        y: 22,
        opacity: 0
    },

    {
        y: 0,
        opacity: 1,

        duration: 0.5,

        ease: "power3.out"
    },

    3.42

);


// Reset button entrance
scrollTl.fromTo(

    "#resetButton",

    {
        y: 18,
        opacity: 0
    },

    {
        y: 0,
        opacity: 1,

        duration: 0.45,

        ease: "power3.out"
    },

    3.58

);


// =========================================================
// SCENE 04 — FINAL CORE
// =========================================================

scrollTl.to(".core", {

    x: -20,
    y: -65,

    scale: 0.70,

    rotation: 720,

    opacity: 1,

    duration: 1,

    ease: "none"

}, 3);


scrollTl.to(".orbit-one", {

    x: -20,
    y: -55,

    scale: 0.84,

    rotation: 650,

    opacity: 0.65,

    duration: 1,

    ease: "none"

}, 3);


scrollTl.to(".orbit-two", {

    x: -25,
    y: -55,

    scale: 0.87,

    rotation: 520,

    opacity: 0.55,

    duration: 1,

    ease: "none"

}, 3);


scrollTl.to(".orbit-three", {

    x: -15,
    y: -45,

    scale: 0.84,

    rotation: 700,

    opacity: 0.45,

    duration: 1,

    ease: "none"

}, 3);


// Final atmosphere
scrollTl.to(".grid", {

    opacity: 0.45,

    duration: 0.6

}, 3.2);


// =========================================================
// LIVE ENERGY SYSTEM
// =========================================================

function updateEnergy(time) {

    let state = "STABLE";
    let energy = 18;


    if (time >= 3) {

        state = "COMPLETE";
        energy = 100;

    }
    else if (time >= 2) {

        state = "CHARGED";
        energy = 81;

    }
    else if (time >= 1) {

        state = "DISTURBED";
        energy = 47;

    }


    // Mouse engagement overrides the normal state
    if (isCoreEngaged) {

        state = "ENGAGED";

        energy = Math.max(
            energy,
            66
        );

    }


    if (coreState) {

        coreState.textContent =
            state;

    }


    if (coreEnergy) {

        coreEnergy.textContent =
            String(energy).padStart(3, "0");

    }

}


// =========================================================
// WHAT'S YOUR FIZZ?
// =========================================================

const modes = {

    create: {

        state: "CREATE",

        energy: 32,

        scale: 1.04,

        rotation: 8,

        message:
            "Turn ideas into motion."

    },


    grow: {

        state: "GROW",

        energy: 58,

        scale: 1.10,

        rotation: -8,

        message:
            "Make your digital presence bigger."

    },


    connect: {

        state: "CONNECT",

        energy: 72,

        scale: 0.98,

        rotation: 12,

        message:
            "Bring people closer."

    },


    explore: {

        state: "EXPLORE",

        energy: 94,

        scale: 1.15,

        rotation: -15,

        message:
            "Discover what's possible."

    }

};


// =========================================================
// MODE SELECTION
// =========================================================

choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const selectedMode =
            choice.dataset.mode;

        const mode =
            modes[selectedMode];


        if (!mode) {
            return;
        }


        currentMode =
            selectedMode;


        // Active button
        choices.forEach((item) => {

            item.classList.remove(
                "active"
            );

        });


        choice.classList.add(
            "active"
        );


        // Core mode
        core.classList.remove(

            "mode-create",
            "mode-grow",
            "mode-connect",
            "mode-explore"

        );


        core.classList.add(
            `mode-${selectedMode}`
        );


        // Core pulse
        gsap.fromTo(

            core,

            {
                filter:
                    "brightness(1)"
            },

            {
                filter:
                    "brightness(1.16)",

                duration: 0.18,

                yoyo: true,
                repeat: 1,

                ease:
                    "power2.out"
            }

        );


        // Letter reaction
        gsap.fromTo(

            coreLetter,

            {
                scale: 0.72,

                rotation:
                    -mode.rotation
            },

            {
                scale: 1.08,

                rotation:
                    mode.rotation,

                duration: 0.4,

                ease:
                    "back.out(2)"
            }

        );


        // Particle burst
        gsap.fromTo(

            ".particle",

            {
                scale: 0.5,

                opacity: 0.35

            },

            {
                scale: 1.8,

                opacity: 1,

                duration: 0.4,

                stagger: 0.04,

                ease:
                    "power2.out"

            }

        );


        // Readout
        if (coreState) {

            coreState.textContent =
                mode.state;

        }


        if (coreEnergy) {

            coreEnergy.textContent =
                String(mode.energy)
                    .padStart(3, "0");

        }


        // Dynamic message
        if (choiceMessage) {

            gsap.to(
                choiceMessage,
                {

                    opacity: 0,

                    y: -6,

                    duration: 0.15,

                    onComplete: () => {

                        choiceMessage.textContent =
                            mode.message;


                        gsap.to(
                            choiceMessage,
                            {

                                opacity: 1,

                                y: 0,

                                duration: 0.3,

                                ease:
                                    "power2.out"

                            }

                        );

                    }

                }
            );

        }

    });

});


// =========================================================
// MOUSE-REACTIVE FIZZ CORE
// =========================================================

const moveVisualX =
    gsap.quickTo(
        ".visual",
        "x",
        {
            duration: 0.8,
            ease: "power3.out"
        }
    );


const moveVisualY =
    gsap.quickTo(
        ".visual",
        "y",
        {
            duration: 0.8,
            ease: "power3.out"
        }
    );


const moveGridX =
    gsap.quickTo(
        ".grid",
        "x",
        {
            duration: 1.2,
            ease: "power2.out"
        }
    );


const moveGridY =
    gsap.quickTo(
        ".grid",
        "y",
        {
            duration: 1.2,
            ease: "power2.out"
        }
    );


const moveLetterX =
    gsap.quickTo(
        ".core-letter",
        "x",
        {
            duration: 0.5,
            ease: "power3.out"
        }
    );


const moveLetterY =
    gsap.quickTo(
        ".core-letter",
        "y",
        {
            duration: 0.5,
            ease: "power3.out"
        }
    );


const moveLightX =
    gsap.quickTo(
        ".core-light",
        "x",
        {
            duration: 0.6,
            ease: "power3.out"
        }
    );


const moveLightY =
    gsap.quickTo(
        ".core-light",
        "y",
        {
            duration: 0.6,
            ease: "power3.out"
        }
    );


// =========================================================
// MOUSE MOVE
// =========================================================

window.addEventListener(
    "mousemove",
    (event) => {

        // -----------------------------------------
        // Normalize cursor
        // -----------------------------------------

        const mouseX =
            (event.clientX /
                window.innerWidth - 0.5) * 2;


        const mouseY =
            (event.clientY /
                window.innerHeight - 0.5) * 2;


        // -----------------------------------------
        // Visual parallax
        // -----------------------------------------

        moveVisualX(
            mouseX * 16
        );


        moveVisualY(
            mouseY * 16
        );


        // -----------------------------------------
        // Grid opposite movement
        // -----------------------------------------

        moveGridX(
            mouseX * -10
        );


        moveGridY(
            mouseY * -10
        );


        // -----------------------------------------
        // F letter parallax
        // -----------------------------------------

        moveLetterX(
            mouseX * 7
        );


        moveLetterY(
            mouseY * 7
        );


        // -----------------------------------------
        // Core light movement
        // -----------------------------------------

        moveLightX(
            mouseX * 10
        );


        moveLightY(
            mouseY * 10
        );


        if (!core) {
            return;
        }


        // =================================================
        // FIND DISTANCE FROM CORE
        // =================================================

        const rect =
            core.getBoundingClientRect();


        const coreX =
            rect.left +
            rect.width / 2;


        const coreY =
            rect.top +
            rect.height / 2;


        const distanceX =
            event.clientX - coreX;


        const distanceY =
            event.clientY - coreY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        const engageDistance =
            180;


        // =================================================
        // ENTER ENGAGED STATE
        // =================================================

        if (
            distance < engageDistance &&
            !isCoreEngaged
        ) {

            isCoreEngaged =
                true;


            core.classList.add(
                "engaged"
            );


            gsap.to(core, {

                filter:
                    "brightness(1.18)",

                duration: 0.3,

                ease:
                    "power2.out"

            });


            gsap.to(coreLetter, {

                scale: 1.10,

                duration: 0.35,

                ease:
                    "back.out(1.8)"

            });


            gsap.to(".orbit-one", {

                scale: 1.04,

                opacity: 0.85,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".orbit-two", {

                scale: 1.06,

                opacity: 0.80,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".orbit-three", {

                scale: 1.04,

                opacity: 0.70,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".particle", {

                scale: 1.5,

                duration: 0.4,

                stagger: 0.03,

                ease:
                    "power2.out"

            });


            updateEnergy(
                scrollTl.time()
            );

        }


        // =================================================
        // EXIT ENGAGED STATE
        // =================================================

        if (
            distance >= engageDistance &&
            isCoreEngaged
        ) {

            isCoreEngaged =
                false;


            core.classList.remove(
                "engaged"
            );


            gsap.to(core, {

                filter:
                    "brightness(1)",

                duration: 0.3,

                ease:
                    "power2.out"

            });


            gsap.to(coreLetter, {

                scale: 1,

                duration: 0.3,

                ease:
                    "power2.out"

            });


            gsap.to(".orbit-one", {

                scale: 1,

                opacity: 0.65,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".orbit-two", {

                scale: 1,

                opacity: 0.55,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".orbit-three", {

                scale: 1,

                opacity: 0.45,

                duration: 0.4,

                ease:
                    "power2.out"

            });


            gsap.to(".particle", {

                scale: 1,

                duration: 0.4,

                stagger: 0.03,

                ease:
                    "power2.out"

            });


            updateEnergy(
                scrollTl.time()
            );

        }

    }
);


// =========================================================
// RESET EXPERIENCE
// =========================================================

if (resetButton) {

    resetButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =========================================================
// REFRESH SCROLLTRIGGER
// =========================================================

window.addEventListener(
    "load",
    () => {

        ScrollTrigger.refresh();

    }
);