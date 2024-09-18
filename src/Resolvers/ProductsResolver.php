<?php 

namespace App\Resolvers;

use App\Model\Product;

class ProductsResolver{

    // code of retriveing data here 
    public static function getProducts(){
        return Product::all();
    }
}
