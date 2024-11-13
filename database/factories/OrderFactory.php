<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id' => User::all()->random()->id,
            'status' => $this->faker->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested', 'return_accepted', 'refunded', 'failed']),
            'totalSell' => 0,
        ];
    }
}
