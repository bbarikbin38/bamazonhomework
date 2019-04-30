
// 6. The app should then prompt users with two messages.

// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
// * This means updating the SQL database to reflect the remaining quantity.
// * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "default",
    database: "amazon_db"
});

// just testing if connection works
connection.connect(function (err) {
    if (err) throw err;
    console.log("You are connected as id # " + connection.threadId + "\n");
    console.log("Available products listed below by ID and name \n");
})


//connecting to select everything from the database and list the product ID and product name

connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("Product ID: " + res[i].item_id + "   Product Name: " + res[i].product_name);
    }
    // console.log("Which product would you like to order? Enter the Product ID # Associated With the Product Name");
    // orderProduct();
    productSearch();
});

// i am not able to get the search to work. 
function productSearch() {
    inquirer
        .prompt({
            name: "product",
            type: "input",
            message: "What product would you like to order?"
        })
        .then(function (answer) {
            var query = "SELECT product_name, price, stock_quantity FROM products WHERE item+_id = ?";
            connection.query(query, { product: answer.product }, function (err, res) {
                    // console.log(res.product_name + " || Quantity: " + res.stock_quantity + " || Price: " + res.price);
                    console.log(res);
            });
        });
    }
