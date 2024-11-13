<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('home');
    Route::get('/dashboard', [OrderController::class, 'index'])->name('dashboard');

    Route::resource('orders', OrderController::class, ['except' => ['index', 'update']])->names('orders');
    Route::post('edit-order/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::post('/setCancelled/{order}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
