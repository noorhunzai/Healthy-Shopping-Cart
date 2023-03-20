var grandTotalBill = function () {
  var itemSubTotal = [];
  $("tbody tr").each(function (i, item) {
    var price = parseFloat($(item).find(".price").text());
    var quantity = parseFloat($(item).find(".quantity input").val());
    var subTotal = price * quantity;
    if (quantity) {
      $(item).children(".subTotal").html(subTotal.toFixed(2));
      itemSubTotal.push(subTotal);
    } else {
      $(item).children(".subTotal").html("$____");
    }
  });
  var totalBill =
    itemSubTotal.length > 0 ? itemSubTotal.reduce((sum, num) => sum + num) : 0;
  $("#grandTotal").html(totalBill.toFixed(2));
};
var addItem = function () {
  var newItem = $("#item-name").val();
  var newPrice = parseFloat($("#price").val()).toFixed(2);
  if (!newItem || isNaN(newPrice)) {
    alert("Kindly enter both item name and amount");
  } else {
    $("#lastRow").before(
      "<tr><td class='item'>" +
        newItem +
        "</td><td class='price'>" +
        newPrice +
        "</td><td class='quantity quantity-input'><input type='number'></input></td><td class='subTotal'></td><td><button class='btn remove btn-danger'><i>Remove</i></button></td></tr>"
    );
  }
  $("tr").find("#item-name, #price").val("");
};
var removeItem = function () {
  $(this).closest("tr").remove();
  grandTotalBill();
};
var updateQty = function () {
  clearTimeout(delay);
  var delay = setTimeout(grandTotalBill, 1000);
};
$(document).ready(function () {
  grandTotalBill();
  $(document).on("input", ".quantity", updateQty);
  $(document).on("click", ".remove", removeItem);
  $(document).on("click", ".add", addItem);
  $("#price").on("keyup", function (event) {
    if (event.key === "Enter") {
      addItem();
    }
  });
});
