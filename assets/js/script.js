/* 
    Descrizione:
    Ricreiamo un feed social aggiungendo al layout dello starter kit di base fornito, il nostro script JS in cui:

    Milestone 1
        Creiamo il nostro array di oggetti che rappresentano ciascun post.
        Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
        id del post, numero progressivo da 1 a n
        nome autore,
        foto autore,
        data in formato americano (mm-gg-yyyy),
        testo del post,
        immagine (non tutti i post devono avere una immagine),
        numero di likes.
        Non è necessario creare date casuali
        Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
    
    Milestone 2
        Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
    
    Milestone 3
        Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
    
    BONUS
        Formattare le date in formato italiano (gg/mm/aaaa)
        Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
        Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/


//Definisco gli elementi di cui ho bisogno
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/1000/600?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/1000/600?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/1000/600?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/1000/600?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/1000/600?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
const likedPostList = [];
const feedContainer = document.querySelector('.row');
pageRefresh(feedContainer, posts, likedPostList);

/**
 * 
 * @param {*} feedContainer 
 * @param {*} feedList 
 */
function pageRefresh(feedContainer, feedList, likedPostList) {
    feedGenerator(feedContainer, feedList)
    const likeButtonList = document.querySelectorAll('.like-button > a.btn');
    addLike(likeButtonList, feedList, likedPostList);
}

/**
 * 
 * @param {*} likeButtonList 
 */
function addLike(likeButtonList, feedList, likedPostList) {

    likeButtonList.forEach(likeButton => {
        likeButton.addEventListener('click', function (e) {
            e.preventDefault();

            feedList.forEach(feed => {
                if (feed.id === Number(this.dataset.postid) && feed.liked != true) {
                    feed.likes++;
                    feed.liked = true;
                    likedPostList.push(feed.id)
                    pageRefresh(feedContainer, feedList, likedPostList);
                } else if (feed.id === Number(this.dataset.postid) && feed.liked) {
                    feed.likes--;
                    feed.liked = false;
                    likedPostList.pop(feed.id)
                    pageRefresh(feedContainer, feedList, likedPostList);
                }
            });
        });
    });
}


/**
 * ### feedGenerator
 * > This function creates DOM Elements from a feedList. 
 * @param {Object} DOMElement Element where to add the markup
 * @param {Object[]} FeedList List of Social Feeds
 */
function feedGenerator(DOMElement, feedList) {

    DOMElement.innerHTML = '';

    feedList.forEach(feed => {

        const markup = `
            <div class="col-12">
                <div class="card bg-light">
                    <div class="card-header d-flex align-items-center">
                        <div class="profile-image">
                            <img class="img-fluid"
                                src="${feed.author.image !== null ? feed.author.image : 'https://unsplash.it/300/300?image=1'}"
                                alt>
                        </div>
                        <!-- /.profile-image -->
                        <div class="post-details ms-3">
                            <div class="author fw-bold">
                                ${feed.author.name}
                            </div>
                            <!-- /.author -->
                            <div class="creation-date">
                                ${feed.created}
                            </div>
                            <!-- /.creation-date -->
                        </div>
                        <!-- /.post-details -->
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="post-content mb-3">
                            ${feed.content}
                        </div>
                        <!-- /.post-content -->
                        <div class="post-image">
                            <img class="img-fluid"
                                src="${feed.media}"
                                alt>
                        </div>
                        <!-- /.post-image -->
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <div
                            class="like-interaction d-flex justify-content-evenly align-items-center my-2">
                            <div class="like-button text-center">
                                <a class="btn ${feed.liked ? 'btn-primary' : 'btn-outline-primary'}"
                                    data-postid="${feed.id}">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                    Mi Piace
                                </a>
                            </div>
                            <!-- /.like-button -->
                            <div class="like-counter">
                                Piace a <strong>${feed.likes}</strong> Persone
                            </div>
                            <!-- /.like-counter -->
                        </div>
                        <!-- /.like-interaction -->
                    </div>
                    <!-- /.card-footer -->
                </div>
                <!-- /.card -->
            </div>
            <!-- .col -->
        `;

        DOMElement.insertAdjacentHTML('beforeend', markup);
    })
}

