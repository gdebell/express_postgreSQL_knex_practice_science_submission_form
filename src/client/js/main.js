(function () {

  console.log('sanity check!');

  $(document).on('click', '.delete-btn', function() {
    const message = confirm('Are you sure you want to delete your proposal?');
    if (message) {
      //console.log('button has been clicked!');
      const $this = $(this);
      //console.log($this);
      const proposalID = $this.attr('data-id')
      //console.log(proposalID);
      $.ajax({
        type: 'DELETE',
        url: `/projects/delete/${proposalID}`
      })
      .done((data) => {
        location.reload();
        console.log(data);
      })
      .fail((err) => {
        console.log(err);
      });
    }
  });
})();
