export function createGalleryMarkup(images) {

  const markup = images.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads, }) => {
    
    return `
    <a href=${largeImageURL} target="_self">
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=340 height=250 />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div> 
</div>`
  });
    return markup.join('');
}
