app.filter('kebabCase', function () {
  return function (input) {
    return input.replace(/_|\s+/g , "-");
  };
});

app.filter('dateFilter', function(){
  return function (date) {
    if (date === undefined) {
      date = Date.now();
    }
    var d = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var date = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    return date;
  };
});