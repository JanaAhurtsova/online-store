# Online-store
This app are written in vanilla javascript using webpack and eslint configured for TypeScript validation.
## Application Structure
* Products page with filters
* Selected products cart page
* Modal window of registration (purchase) of selected products
* Product description page
* 404 page
## Products page
1. Implemented products filtering:
    * there are two blocks of filters, by category and type, where a list is implemented with the ability to select a specific category/type
    * there are two filter blocks with sliders (dual-slider), by price ranges and stock availability
    * when applying any filter, all filters are dynamically recalculated and the state of elements in them changes
2. Products sorting implemented
    * sorting products by price and rating (from smallest to largest and reverse)
3. Text search across all product data
    * works together with other filters
4. Switching the type of found products
5. Routing with query parameters
6. Reset and copy search buttons
7. A block for the number of products found
8. Behavior of found products cards
    * The product card contains an add to cart button. The state of the button changes when adding/removing, and is also restored if the product was added on other pages
    * moving to the product description page by clicking on the button
## Selected products cart page
1. Display block for added products
2. An increase in the quantity of a specific product and its removal
3. Pagination
4. Promo code block
5. A block with the total amount and quantity of all selected products
6. A button to open the modal window of registration (purchase) of selected products
## Modal window of registration (purchase) of selected products
1. Block for entering personal information with validation
2. Bank card data entry block with validation
