const stripe = require('stripe')('sk_test_51P93FaSFBSE2XlqfIyzlbiIt1dI5Igxf3oUV9ycRwMptVFuXl99bb7NfQVG0ShCMoLqjXzaaqgkkcOCSwNBfbwtW00Dyx7zxLU');
const UserModel = require('../models/userModel');

exports.payment = async (req, res) => {
    try {
        if(!req.session.user.isPayment){
            res.render('payment', {email: req.session.user.email})
        }else{
            res.redirect('/post-job');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.paymentPost = async (req,res) => {
    try {
        let {email , pub_key} = req.body;
        let user = await UserModel.findOne({email});
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "job portal", 
                    },
                    unit_amount: 30 * 100, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/post-job', 
            cancel_url: 'http://localhost:3000/login', 
            customer_email: email, 
            metadata: {
                publisher_key: pub_key, 
            }
        }); 
        res.redirect(session.url);

        if(user){
            user.isPayment = true;
            await user.save();
        }
    } catch (error) {
        console.log(error);
    }
}