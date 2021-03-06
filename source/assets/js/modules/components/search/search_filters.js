/*
    -------------------------------------------------------------
        searchFilters()

        Search Filters (site search, course search)
    -------------------------------------------------------------
*/

function searchFilters() {
  // detect search filters on page
  if ($('.search-filters').length > 0) {
     //allow expand and close for search filters
    $('.filter-heading').click(function(event) {
      event.preventDefault();
      var c = $(this);

      //run if the heading is not set to not-active
      if (!c.hasClass('not-active')){

        if (c.parent().hasClass('active') ) {
          c.parent().removeClass('active');
        }
        else {
          c.parent().addClass('active');
        }
      }
    });
  }
}
