document.getElementById('movieForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const movieTitle = document.getElementById('movieTitleInput').value.trim();
    if (!movieTitle) {
        displayError('Please enter a movie title.');
        return;
    }

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').textContent = '';
    document.getElementById('movieDetails').style.display = 'none';

    fetch(`/api/movie?title=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError(data.error);
            } else {
                displayMovie(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayError('An error occurred while fetching the movie.');
        })
        .finally(() => {
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';
        });
});

function displayMovie(movie) {
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.style.display = 'block';

    document.getElementById('movieTitle').textContent = movie.Title || 'N/A';
    document.getElementById('movieImage').src = movie.Poster || 'https://via.placeholder.com/300?text=No+Poster';
    document.getElementById('movieImage').alt = `${movie.Title} Poster`;
    document.getElementById('moviePlot').textContent = movie.Plot || 'N/A';
    document.getElementById('movieActors').textContent = movie.Actors || 'N/A';
    document.getElementById('movieDirector').textContent = movie.Director || 'N/A';
    document.getElementById('movieGenre').textContent = movie.Genre || 'N/A';
    document.getElementById('movieReleased').textContent = movie.Released || 'N/A';
    document.getElementById('movieRuntime').textContent = movie.Runtime || 'N/A';
    document.getElementById('movieRating').textContent = movie.imdbRating || 'N/A';
}

function displayError(errorMessage) {
    document.getElementById('error').textContent = errorMessage;
    document.getElementById('movieDetails').style.display = 'none';
}