<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class OrderService
{
    public function updateOrder(Order $order, array $data)
    {
        // Log::info($data);
        $order->update([
            'user_id' => $data['user_id'],
            'status' => $data['status'],
        ]);

        $totalSell = $this->processOrderDetails($order, $data['order_details']);
        $order->update(['totalSell' => $totalSell]);

        log::info("2323");
        log::info($order);

        return $order;
    }

    public function createOrder(array $data)
    {
        $userId = $data['user_id'] ?? auth()->id();


        if (!$userId) {
            Log::info('Usuario no autenticado');
            throw new \Exception('Usuario no autenticado');
        }

        $order = Order::create([
            'user_id' => $userId,
            'status' => $data['status'],
            'totalSell' => 0,
        ]);


        $totalSell = $this->processOrderDetails($order, $data['order_details']);
        $order->update(['totalSell' => $totalSell]);


        return $order;
    }

    private function processOrderDetails(Order $order, array $orderDetailsData)
    {

        if (empty($orderDetailsData)) {
            return $order->totalSell;
        }

        $order->orderDetails()->delete();

        $totalSell = 0;

        foreach ($orderDetailsData as $detail) {

            log::info("da");
            log::info($detail);
            $productId = $detail['product_id'] ?? $detail['id'];
            $product = Product::find($productId);

            if (!$product) {
                Log::error('Producto no encontrado', ['productId' => $productId]);
                continue;
            }

            $totalSell += $product->price;

            $order->orderDetails()->create([
                'product_id' => $product->id,
                'productName' => $product->title,
                'priceUnit' => $product->price,
            ]);
        }

        return $totalSell;
    }
}
