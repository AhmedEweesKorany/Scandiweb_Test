<?php

use App\Database\Database;

require __DIR__ . '/../vendor/autoload.php';

$config = require __DIR__ . '/../src/Config/Config.php';
$conn = new Database($config['database']);
var_dump($conn->getConnection());

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->post('/graphql', [App\Controller\GraphQL::class, 'handle']);
    $r->get('/', function() {
        return json_encode(['message' => 'Welcome to the GraphQL API. Use POST /graphql to interact.']);
    });
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

header('Content-Type: application/json; charset=UTF-8'); // Ensure JSON response

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['error' => '404 Not Found']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        http_response_code(405);
        echo json_encode(['error' => '405 Method Not Allowed', 'allowedMethods' => $allowedMethods]);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
    default:
        http_response_code(500);
        echo json_encode(['error' => '500 Internal Server Error']);
        break;
}