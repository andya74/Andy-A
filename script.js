/* =========================
   PENGATURAN
========================= */

/*
   GANTI NOMOR INI DENGAN
   NOMOR WHATSAPP KAMU.

   Contoh:
   628123456789
*/

const whatsappNumber =
    "6285722638437";


/* =========================
   AUDIO
========================= */

const audio =
    document.getElementById(
        "audio"
    );

const musicPlayer =
    document.getElementById(
        "musicPlayer"
    );

const playerCover =
    document.getElementById(
        "playerCover"
    );

const playerTitle =
    document.getElementById(
        "playerTitle"
    );

const playerArtist =
    document.getElementById(
        "playerArtist"
    );

const playPause =
    document.getElementById(
        "playPause"
    );

const progress =
    document.getElementById(
        "progress"
    );

const currentTime =
    document.getElementById(
        "currentTime"
    );

const totalTime =
    document.getElementById(
        "totalTime"
    );

const volume =
    document.getElementById(
        "volume"
    );


let currentIndex = -1;


/* =========================
   SEMUA LAGU
========================= */

const covers =
    Array.from(
        document.querySelectorAll(
            ".cover"
        )
    );


/* =========================
   BUKA PLAYER
========================= */

covers.forEach(
    (cover,index) => {

        cover.addEventListener(
            "click",
            () => {

                openPlayer(index);

            }
        );

    }
);


/* =========================
   PREVIEW BUTTON
========================= */

document
    .querySelectorAll(
        ".preview-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    covers.findIndex(
                        cover =>
                        cover.dataset.audio ===
                        button.dataset.audio
                    );

                openPlayer(index);

            }
        );

    });


/* =========================
   OPEN PLAYER
========================= */

function openPlayer(index){

    if(index < 0)
        return;

    currentIndex =
        index;


    const cover =
        covers[index];


    playerCover.src =
        cover.src;


    playerTitle.innerText =
        cover.dataset.title;


    playerArtist.innerText =
        cover.dataset.artist;


    audio.src =
        cover.dataset.audio;


    musicPlayer.classList.add(
        "open"
    );


    audio.play()
        .then(() => {

            playPause.innerText =
                "❚❚";

        })
        .catch(() => {

            playPause.innerText =
                "▶";

            showToast(
                "Audio tidak dapat diputar"
            );

        });

}


/* =========================
   PLAY / PAUSE
========================= */

playPause.addEventListener(
    "click",
    () => {

        if(!audio.src){

            return;

        }


        if(audio.paused){

            audio.play();

            playPause.innerText =
                "❚❚";

        }else{

            audio.pause();

            playPause.innerText =
                "▶";

        }

    }
);


/* =========================
   AUDIO READY
========================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.innerText =
            formatTime(
                audio.duration
            );

    }
);


/* =========================
   PROGRESS
========================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if(!audio.duration)
            return;


        progress.value =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        currentTime.innerText =
            formatTime(
                audio.currentTime
            );

    }
);


/* =========================
   SEEK
========================= */

progress.addEventListener(
    "input",
    () => {

        if(!audio.duration)
            return;


        audio.currentTime =
            (
                progress.value /
                100
            ) *
            audio.duration;

    }
);


/* =========================
   VOLUME
========================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


/* =========================
   NEXT
========================= */

document
    .getElementById(
        "next"
    )
    .addEventListener(
        "click",
        () => {

            if(covers.length === 0)
                return;


            currentIndex++;


            if(
                currentIndex >=
                covers.length
            ){

                currentIndex = 0;

            }


            openPlayer(
                currentIndex
            );

        }
    );


/* =========================
   PREVIOUS
========================= */

document
    .getElementById(
        "previous"
    )
    .addEventListener(
        "click",
        () => {

            if(covers.length === 0)
                return;


            currentIndex--;


            if(currentIndex < 0){

                currentIndex =
                    covers.length - 1;

            }


            openPlayer(
                currentIndex
            );

        }
    );


/* =========================
   AUTO NEXT
========================= */

audio.addEventListener(
    "ended",
    () => {

        currentIndex++;


        if(
            currentIndex >=
            covers.length
        ){

            currentIndex = 0;

        }


        openPlayer(
            currentIndex
        );

    }
);


/* =========================
   CLOSE PLAYER
========================= */

document
    .getElementById(
        "playerClose"
    )
    .addEventListener(
        "click",
        () => {

            audio.pause();

            musicPlayer.classList.remove(
                "open"
            );

        }
    );


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds){

    if(
        !seconds ||
        isNaN(seconds)
    ){

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsLeft =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            secondsLeft
        ).padStart(
            2,
            "0"
        )
    );

}


/* =========================
   FILTER
========================= */

let currentFilter =
    "all";


document
    .querySelectorAll(
        ".filter"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter"
                    )
                    .forEach(
                        item => {

                            item.classList
                                .remove(
                                    "active"
                                );

                        }
                    );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                filterProducts();

            }
        );

    });


/* =========================
   SEARCH
========================= */

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "input",
        filterProducts
    );


function filterProducts(){

    const keyword =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();


    document
        .querySelectorAll(
            ".product"
        )
        .forEach(product => {

            const name =
                product.dataset.name
                    .toLowerCase();


            const type =
                product.dataset.type;


            const matchName =
                name.includes(
                    keyword
                );


            const matchType =
                currentFilter ===
                "all" ||
                currentFilter ===
                type;


            if(
                matchName &&
                matchType
            ){

                product.style.display =
                    "";

            }else{

                product.style.display =
                    "none";

            }

        });

}


/* =========================
   BUY
========================= */

document
    .querySelectorAll(
        ".buy-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const product =
                    button.dataset.product;


                const message =
                    "Halo Andy A 👋%0A%0A" +
                    "Saya ingin membeli:%0A" +
                    product +
                    "%0A%0A" +
                    "Mohon informasi pembayaran.";


                const url =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    message;


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    });


/* =========================
   REQUEST
========================= */

document
    .getElementById(
        "requestButton"
    )
    .addEventListener(
        "click",
        () => {

            const title =
                document
                .getElementById(
                    "songTitle"
                )
                .value;


            const category =
                document
                .getElementById(
                    "category"
                )
                .value;


            const style =
                document
                .getElementById(
                    "style"
                )
                .value;


            if(!title){

                showToast(
                    "Isi judul lagu dulu"
                );

                return;

            }


            const message =
                "Halo Andy A 👋%0A%0A" +
                "REQUEST PROJECT%0A%0A" +
                "Judul Lagu: " +
                title +
                "%0A" +
                "Kategori: " +
                category +
                "%0A" +
                "Style: " +
                style;


            const url =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* =========================
   TOAST
========================= */

function showToast(message){

    const toast =
        document.getElementById(
            "toast"
        );


    toast.innerText =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}