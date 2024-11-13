<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDetail>
 */
class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first();
        $price = $product->price;

        $price = round($price, 2);

        return [
            'productName' => $product->title,
            'product_id' => $product->id,
            'amount' => $this->faker->numberBetween(1, 10),
            'priceUnit' => $price,
        ];
    }
}
