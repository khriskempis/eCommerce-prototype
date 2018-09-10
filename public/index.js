MOCK_ITEM_INFO = []

function populateMockData(num){
	for(let i=1; i<=num; i++){
		let object = {
			"id": `${i}`,
			"name": `Item name ${i}`,
			"description": `item description of number ${i}`,
			"qty": i/1,
			"cost": i*3,
			"price": {
				"regular": i*6,
				"sale": i*3
			},
			"image_url": "https://image.com/image",
			"category": ["Action Figure", "Godzilla"]
		}
		MOCK_ITEM_INFO.push(object)
	}
}

// get data from API
function getItems(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_ITEM_INFO)}, 100);
};

// generate individual html for each item
function generateItemHtml(item) {
	return `<div class="item">
				<img src="../champImgs/IMG_3237.PNG">
				<h3 class="name">${item.name}</h3>
				<p class="description">${item.description}</p>
				<p class="price">$${item.price.regular}</p>
				<button class="add-to-cart-button">Add to Cart</button>
			</div>`
};

function generateAndDisplayArrayOfItems(data){
	let itemsHtml = [];
	data.map(item => {
		itemsHtml.push(generateItemHtml(item))
	});
	$('.inventory-display').html(itemsHtml);
};

// render Items to client 
function renderItemsHtml(){
	let itemsHtml =	getItems(generateAndDisplayArrayOfItems);
};

function init(){
	$(populateMockData(10))
	$(renderItemsHtml());
}

$(init());


