
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./main.scss";

// Function component definition
function ImdbDownload(props) {
    // React hooks
    const [visible, setVisible] = useState(false);
    return (
        <h1>Hello World!</h1>
    );
}



// Find imdb movie code
let url = window.location.href;
let imdbTitle = url.match(/tt\d+\//);

// check if url page contain imdb code
if (imdbTitle) {
    // Exact imdb code
    let imdbCode = imdbTitle[0].substring(0, imdbTitle[0].length - 1);

    // Add main element
    let main = document.createElement("div");
    main.id = "imdb-movie-downloader";
    document.body.appendChild(main);

    // render de App component
    ReactDOM.render(
        <ImdbDownload imdbCode={imdbCode} />,
        document.getElementById(main.id)
    );


    /*fetchMovie(imdbCode)
        .then((data) => {
            // Action button
            let actionButton = document.createElement("div");
            actionButton.id = "imd-action-button";
            actionButton.innerText = "Downlad Movie";

            main.appendChild(actionButton);

            // Torrents div
            let torrentContainer = document.createElement("div");
            torrentContainer.id = "imd-torrent-container";
            main.appendChild(torrentContainer);

            // Add torrent info
            data.torrents.map((torrent, index) => {
                // Torrent div
                let elTorrent = document.createElement("div");
                elTorrent.id = "imd-torrent" + index;
                elTorrent.classList.add("imd-torrent-element");

                // Torrent link
                let linkTorrent = document.createElement('a');
                linkTorrent.href = torrent.url;
                linkTorrent.innerText = torrent.quality;
                elTorrent.appendChild(linkTorrent);

                torrentContainer.appendChild(elTorrent);

            })
        })
        .catch((err) => console.error(err));
        */


}

/**
 * Fetch yts.am data for given imdbcode
 *
 * @param {*} imdbCode
 * @returns
 */
function fetchMovie(imdbCode) {
    return new Promise((resolve, reject) => {
        fetch("https://yts.am/api/v2/list_movies.json?query_term=" + imdbCode)
            .then((response) => {
                if (response.status >= 300) {
                    reject(response.statusText)
                } else {
                    response.json().then(function (data) {
                        if (data.status === "ok") {
                            resolve(data.data.movies[0])
                        }
                    }).catch((err) => reject(err))
                }
            })
            .catch((e) => reject(e));
    })
}