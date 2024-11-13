<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dashboard\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;

    public function definition(): array
    {
        $productName = $this->faker->words(3, true);
        return [
            'title' => ucwords($this->faker->words(3, true)),
            'slug' => Str::slug($productName) . '-' . rand(100, 9999),
            'sku' => $this->faker->unique()->numberBetween(1000000000, 9999999999),
            'price' => $this->faker->numberBetween(10, 1000),
            'desc' => "Descripción de $productName",
            'quantityStock' => $this->faker->numberBetween(1, 100),
            'user_id' => User::all()->random()->id,
        ];
    }
}
