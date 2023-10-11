// sk_test_51O04aBKiFsafBzXu5ulNZqJ5FAEW35tvGVyVHtnYsvCgkiubsakxGW7QFB8OVccb0wcVipaIxTYpyh0mEbyb0K6P00NEdwLkkj

// Coffee : price_1O04fRKiFsafBzXuJ5tBbwnp
// Sunglasses : price_1O04gQKiFsafBzXucHEL2Kw3
// Camera : price_1O04hTKiFsafBzXu4aOEHj7H

const express = require('express');
var cors =  require('cors');
const stripe = require('stripe')('sk_test_51O04aBKiFsafBzXu5ulNZqJ5FAEW35tvGVyVHtnYsvCgkiubsakxGW7QFB8OVccb0wcVipaIxTYpyh0mEbyb0K6P00NEdwLkkj')

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));
