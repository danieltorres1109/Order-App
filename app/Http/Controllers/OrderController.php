<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(): \Inertia\Response
    {
        $orders = Order::with('user')->latest()->get();
        return Inertia::render('Orders/Index.page', [
            'orders' => $orders
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
}
