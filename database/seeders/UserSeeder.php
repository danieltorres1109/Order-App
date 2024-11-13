<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Daniel Torres',
            'email' => 'danieltorres1109@gmail.com',
            'password' => bcrypt("password"),
        ]);

        User::factory(10)->create();
    }
}
