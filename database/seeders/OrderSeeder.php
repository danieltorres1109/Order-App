<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory()->count(100)->create()->each(function ($sale) {
            // $details = SaleDetail::factory()->count(rand(1, 5))->make();
            // $total = 0;

            // foreach ($details as $detail) {
            //     $detail->sale_id = $sale->id;
            //     $detail->save();
            //     $total += $detail->amount * $detail->priceUnit;
            // }

            // $sale->totalSell = $total;
            // $sale->save();
        });
    }
}
