<?php
namespace App\Types;
use App\Model\Attribute;
use App\Model\Price;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;


class Types{
    public static $attributeType;
    public static $priceType;
    public static $productType;
    public static $orderType;
    public static $categoryType;
    public function __construct(){
        self::$attributeType = new ObjectType([
            'name' => 'Attribute',
            'description' => 'An attribute',
            'fields' => [
                'id' => Type::string(),
                'product_id' => Type::string(),
                'items' => Type::string(),
                'type' => Type::string(),
                'name' => Type::string(),
            ]
        ]);

        self::$priceType = new ObjectType([
            'name' => 'Price',
            'description' => 'A price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => Type::string(),
            ]
        ]);

        self::$categoryType = new ObjectType([
            'name' => 'category',
            'description' => 'A category',
            'fields' => [
                'name' => Type::string(),
            ]
        ]);


        $priceType = self::$priceType; // Define $priceType before the function
        $attributeType = self::$attributeType; // Define $attributeType before the function

        self::$productType =  new ObjectType([
            'name' => 'Product',
            'description' => 'A product',
            'fields' =>  function () use ($priceType, $attributeType) {
        
                return [
                    'id' => Type::string(),
                    "name" => Type::string(),
                    "brand" => Type::string(),
                    "description" => Type::string(),
                    "inStock" => Type::boolean(),
                    "category" => Type::string(),
                    "gallery" => Type::string(),
                    "prices" => [
                        'type' => Type::listOf($priceType),
                        'resolve' => function ($root) {
                            $productId = $root['id'];
                            $productPrices = Price::where("product_id", "=", $productId);
                            return $productPrices;
                        }
                    ],
                    "attributes" => [
                        'type' => Type::listOf($attributeType),
                        'resolve' => function ($root) {
                            $productId = $root['id'];
                            $productAttributes = Attribute::where("product_id", "=", $productId);
                            return $productAttributes;
                        }
                    ],
        
                ];
            }
        ]);

        self::$orderType = new ObjectType([
            'name' => 'Order',
            'description' => 'An order',
            'fields' => [
                'id' => Type::int(),
                'details' => Type::nonNull(Type::string()),
                'status' => Type::nonNull(Type::string()),
                'total' => Type::nonNull(Type::float()),
                'created_at' => Type::nonNull(Type::string()),
            ]
        ]);
    }
}
 