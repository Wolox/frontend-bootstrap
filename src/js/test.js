(function () {

  var a = document.body;

  // it works
  var strings = ['uno', 'dos'];

  // it works
	a.classList ? a.classList.add(strings[0]) : a.className += strings[0];

  var b = $('input').val();
  $('body').addClass(b);
})();

$( ".gilada" ).click(function() {
  // works too
  $('body').addClass(strings[1]);
});