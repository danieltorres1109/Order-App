<?php

namespace App\Models;


use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'sku',
        'price',
        'desc',
        'totalSell',
        'user_id',
        'brand_id',
        'category_id',
        'percentage',
        'expirationDate',
        'segmentation_id',
        'is_visible',
        'quantityStock',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // public function saleDetails()
    // {
    //     return $this->hasMany(SaleDetail::class);
    // }
}
