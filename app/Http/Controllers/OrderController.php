<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{

    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }


    public function index(): \Inertia\Response
    {
        /* como orderno por id ultimo? */
        $orders = Order::with('user')->orderBy('id', 'desc')->get();
        // $orders = Order::with('user')->
        return Inertia::render('Orders/Index.page', [
            'orders' => $orders
        ]);
    }

    public function create(): \Inertia\Response
    {
        $users = User::all();
        $products = Product::all();

        return Inertia::render('Orders/Create.page', [
            'users' => $users,
            'products' => $products
        ]);
    }

    public function edit(string $id): \Inertia\Response
    {
        $order = Order::with(['user', 'orderDetails'])->find($id);
        $users = User::all();
        $products = Product::all();

        return Inertia::render('Orders/Edit.page', [
            'order' => $order,
            'users' => $users,
            'products' => $products
        ]);
    }

    public function store(StoreOrderRequest $request)
    {
        $this->orderService->createOrder($request->validated());
        return Redirect::back()->with('success', 'Orden creada exitosamente.');
    }

    public function update(UpdateOrderRequest $request, string $id)
    {
        $order = Order::findOrFail($id);
        $this->orderService->updateOrder($order, $request->validated());
        return Redirect::back()->with('success', 'Venta actualizada.');
    }
}
