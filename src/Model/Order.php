<?php 

namespace App\Model;


class Order extends Model{

    protected string $table = 'orders';

    protected $fillable = ['user_id', 'product_id', 'quantity', 'total_price'];
    
}
