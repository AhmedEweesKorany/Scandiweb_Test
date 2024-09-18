<?php

namespace App\Controller;

use App\Resolvers\ProductsResolver;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        // Ensure Types.php is properly required
        require_once __DIR__ . '/../Types/Types.php';

        try {
            // Ensure $productType is defined
            if (!isset($productType)) {
                throw new RuntimeException('Product type is not defined');
            }

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'Products' => [
                        'type' => Type::listOf($productType),
                        'resolve' => function($rootValue, array $args) {
                            return ProductsResolver::getProducts();
                        },
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                ],
            ]);

            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            if ($input === null) {
                throw new RuntimeException('Invalid JSON input');
            }

            $query = $input['query'] ?? null;
            $variableValues = $input['variables'] ?? null;

            if ($query === null) {
                throw new RuntimeException('Query is missing from the input');
            }

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();

        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        // Set the Content-Type header for JSON response
        header('Content-Type: application/json');
        return json_encode($output); // Ensure JSON response
    }
}
