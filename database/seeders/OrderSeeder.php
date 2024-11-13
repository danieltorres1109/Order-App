<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory()->count(100)->create()->each(function ($order) {
            $details = OrderDetail::factory()->count(rand(1, 4))->make();
            $total = 0;

            foreach ($details as $detail) {
                $detail->order_id = $order->id;
                $detail->save();
                $total += $detail->priceUnit;
            }

            $order->totalSell = $total;
            $order->save();
        });
    }
}
