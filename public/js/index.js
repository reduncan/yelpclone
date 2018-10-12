$('#submitIndex').on('click', function (e) {
    e.preventDefault();
    let searchTag = $('#searchInput').val().trim();
    let locationTag = $('#locationInput').val().trim();
    sessionStorage.setItem('searchTag', `${searchTag}`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});