var moviesData = JSON.parse(movies);

$(document).ready(function() 
{

    createContent();
    $('.sort').on('click',sortByLikes);
    $('.like').on('click',calcLike);
    $('.sortNew').on('click',sortByAgeNew);
    $('.sortOld').on('click',sortByAgeOld);
    $('.sortImdb').on('click',sortByImdb);
    $('.readmore-btn').on('click',readMore);


// Functions definitions 

// Create cards with movies
    function createContent()
    {
        for (let i = 0 ; i < moviesData.length ; i++) 
        {
            $('#content').append(`            
                <div id="movie${i}" class="card mb-3 col-s-3 m-2 p-2" style="max-width: 540px;"> 
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${moviesData[i].image}" class="card-img" alt="movie_pic">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${moviesData[i].movieName}</h5>
                                <p class="card-text"><small class="text-muted">Directed by ${moviesData[i].director}, ${moviesData[i].year}</small></p>
                                <p class="card-text description">${moviesData[i].description}</p>
                                <a class="readmore-btn" href="#!">...read more</a>                              
                                <p class="card-text row" id="${i}">
                                    <span class="col-3 mt-2">${moviesData[i].imdb}<small class="text-muted">/10</small></span>
                                    <button type="button" class="col-5 offset-3 btn btn-primary btn-lg like">Like &#128077;<span class="number"> ${moviesData[i].likes}</span></button>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    }

// Remove content
    function removeContent()
    {
        for (let i = 0 ; i < moviesData.length ; i++)
        {
            $(`#movie${i}`).remove()
        }
    }

// Sort movies by likes
    function sortByLikes()
    {
        moviesData = moviesData.sort((a,b) => b.likes - a.likes);
        for (let i = 0 ; i < moviesData.length ; i++)
        removeContent();
        createContent();
        $('.like').on('click',calcLike);
        $('.readmore-btn').on('click',readMore);
    }

// Sort movies by age from latest
    function sortByAgeNew()
    {
        moviesData = moviesData.sort((a,b) => Number(b.year) - Number(a.year));
        removeContent();
        createContent();
        $('.like').on('click',calcLike);
        $('.readmore-btn').on('click',readMore);
    }

// Sort movies by age from oldest
    function sortByAgeOld()
    {
        moviesData = moviesData.sort((a,b) => Number(a.year) - Number(b.year));
        removeContent();
        createContent();
        $('.like').on('click',calcLike);
        $('.readmore-btn').on('click',readMore);
    }

// Sort movies by imdb rating
    function sortByImdb()
    {
        moviesData = moviesData.sort((a,b) => Number(b.imdb) - Number(a.imdb));
        removeContent();
        createContent();
        $('.like').on('click',calcLike);
        $('.readmore-btn').on('click',readMore);
    }

// Calculate likes
    function calcLike()
    {
        var x = $(this).parent().attr('id');
        moviesData[x].likes += 1;
        $(`#${x} > button > span`).text(moviesData[x].likes)
    }
      
    function readMore()
    {
        $(this).siblings('p:eq(1)').toggleClass('descriptionAll');
        if ($(this).text() === "...read more") {
            $(this).text("...read less")
        } else {
            $(this).text("...read more")
        }
    }
})