// Import router package
const router = require("express").Router();
const productService = require("../services/productService.js");

/* Handle get requests for '/'
/* this is the index or home page
*/
router.get("/", async (req, res) => {
  // Get all products
  try {
    // call the service
    const result = await productService.getProducts();

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// Endpoint to handle requests for product by id
// req.params version (prefered)
// req format: /product/1
//
router.get("/:id", async (req, res) => {
  // read values from req
  const id = req.params.id;

  // If params are missing return 400
  if (typeof id === "undefined") {
    res.statusMessage = "Bad Request - missing id";
    res.status(400).json({ content: "error" });
  }

  try {
    // Call the service
    const result = await productService.getProductById(id);

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// Endpoint to handle requests for product by id
// req.query version
// req format: /product/byid?id=1
//
router.get("/bycat/:catId", async (req, res) => {
  // read values from req
  const catId = req.params.catId;

  // If params are missing return 400
  if (typeof catId === "undefined") {
    res.statusMessage = "Bad Request - missing cat id";
    res.status(400).json({ content: "error" });
  }
  // Get product
  try {
    const result = await productService.getProductsByCatId(catId);

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

/* Handle HTTP POST requests for '/'
/* this endpoint is for adding new products
*/
router.post("/", async (req, res) => {
  // the request body contains the new product values - copy it
  const newProduct = req.body; // show what was copied in the console (server side)

  try {
    // Use the service to create the new product
    // If all goes well, return the result 
    result = await productService.addOrUpdateProduct(newProduct);
    console.log('new: ', result);
    res.json(result); 
  
  // Otherwise handle server (status 500) errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

/* Handle HTTP PUT requests for '/'
/* this endpoint is for updating existing products
*/
router.put("/", async (req, res) => {
  // the request body contains the new product values - copy it
  const product = req.body; // show what was copied in the console (server side)

  try {
    // Use the service to create the new product
    // If all goes well, return the result 
    result = await productService.addOrUpdateProduct(product);
    console.log('new: ', result);
    res.json(result); 
  
  // Otherwise handle server (status 500) errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// Endpoint to handle requests to delete product by id
//
router.delete("/:id", async (req, res) => {
  // read values from req
  const id = req.params.id;

  // If params are missing return 400
  if (typeof id === "undefined") {
    res.statusMessage = "Bad Request - missing id";
    res.status(400).json({ content: "error" });
  }

  try {
    // Call the service
    const result = await productService.deleteProduct(id);

    // Send response back to client
    res.json(result);

    // Catch and send errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// export
module.exports = router;
