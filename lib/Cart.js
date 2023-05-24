'use strict';

class Cart {
    static addToCart(product, cart) {
        if(!this.inCart(product.vehicleitem_id, cart)) {
            // let format = new Intl.NumberFormat(config.locale.lang, {style: 'currency', currency: config.locale.currency });
            let prod = {
                cart_id: "0",
                item_id: product.vehicleitem_id,
                owner_id: product.user_id,
                owner_email: product.user_email,
                item_name: product.aci_name,
                item_plate: product.vehicle_vin_number,
                item_image: product.vehicle_images,
                item_pae: ((product.vehicle_on_offer===false || product.vehicle_on_offer===undefined) ? product.vehicle_price : product.vehicle_offer_price),
                item_qty: cart.numberodays,
                item_dt: Date.now(),
                u_id: "",
                total: ((product.vehicle_on_offer===false || product.vehicle_on_offer===undefined) ? (product.vehicle_price*cart.numberodays) : (product.vehicle_offer_price*cart.numberodays)),
                order_id: "",
                address: cart.shipping,
                places: cart.places,
                item_status: "pending",
                payment_status: "pending",
                crt_id: "",
                read: "false",
                adminread:"false"
            };
            if(!cart.items || cart.items.length>0){
                cart.items=[];
            }
            cart.items.push(prod);
            this.calculateTotals(cart);
        }else{
           // this.upDateProductInCart(product,cart);            
        }
    }

    static deduceToCart(cart) {
            this.upDateProductInCart(product,cart);            
    }

    static removeFromCart(id = 0, cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.item_id === id) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }
    }

    static updateFromCart(id = 0, cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.item_id === id) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }
    }

    static deduceFromCart(id = 0, cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.item_id === id) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }
    }

    static updateCart(ids = [], qtys = [], cart) {
        let map = [];
        let updated = false;
        ids.forEach(function(id ) {
           qtys.forEach(function(qty){
              map.push({
                  id: parseInt(id, 10),
                  qty: parseInt(qty, 10)
              });
           });
        });
        map.forEach(obj => {
            cart.items.forEach(function(item) {
               if(item.id === obj.id) {
                   if(obj.qty > 0 && obj.qty !== item.qty) {
                       item.qty = obj.qty;
                       updated = true;
                   }
               }
            });
        });
        if(updated) {
            this.calculateTotals(cart);
        }
    }

    static upDateProductInCart(product=null,cart){
        let updated = false;
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
           if(item.item_id === product.vehicleitem_id) {
               item.item_qty=cart.numberodays;
               item.item_pae=((product.vehicle_on_offer===false||product.vehicle_on_offer===undefined) ? product.vehicle_price : product.vehicle_offer_price);
               item.total=((product.vehicle_on_offer==false||product.vehicle_on_offer===undefined) ? (product.vehicle_price*item.item_qty) : (product.vehicle_offer_price*item.item_qty));   
            }
        };
        this.calculateTotals(cart);
        return updated;
    }

    static upDateAddProductInCart(product=null,cart){
        let updated = false;
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
           if(item.item_id === product.item_id ) {
               item.item_qty=cart.numberodays;
               item.total=item.item_pae*item.item_qty;
           }
        };
        this.calculateTotals(cart);
        return updated;
    }

    static upDateRemoveProductInCart(product=null,cart){
        let updated = false;
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
           if(item.item_id === product.item_id && item.item_qty > 0 ) {
               item.item_qty=cart.numberodays;
               item.total=item.item_pae*item.item_qty;
            }else if(item.item_id === product.item_id && item.item_qty == 0 ){
                cart.items.splice(index, 1);
            }
        };
        this.calculateTotals(cart);
        return updated;
    }
    
    static upDateProductAddress(product=null,cart,addr=""){
        let updated = false;
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
           if(item.item_id === product.vehicleitem_id ) {
               item.address=addr;
               }
        };
        this.calculateTotals(cart);
        return updated;
    }

    static inCart(productID, cart) {        
        let found = false;
        if(cart){
            for(let i = 0; i < cart.items.length; i++) {
                let item = cart.items[i];
           if(item.item_id === productID) {
               found = true;
           }
        };
        }
        return found;
    }

    static calculateTotals(cart) {
        cart.pricetotals=0.00;
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            let price = item.item_pae;
            let qty = item.item_qty;
            let amount = price * qty;
            cart.totals = cart.totals + qty;
            cart.pricetotals=(Math.round(cart.pricetotals) + Math.round(amount));
        };

        // this.setFormattedTotals(cart);
    }

   static emptyCart(request) {  
        if(request.session) {
            request.session.cart.items = [];
            request.session.cart.totals = 0.00;
            // request.session.cart.formattedTotals = '';
            request.session.cart.pricetotals=0.00;
        }


    }

    static setFormattedTotals(cart) {
        let format = new Intl.NumberFormat(config.locale.lang, {style: 'currency', currency: config.locale.currency });
        let totals = cart.totals;
        cart.formattedTotals = format.format(totals);
    }

}

module.exports = Cart;