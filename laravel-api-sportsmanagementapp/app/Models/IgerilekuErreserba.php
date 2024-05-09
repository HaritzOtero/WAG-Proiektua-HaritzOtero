<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IgerilekuErreserba extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kalea_id',
        'igerileku_erreserba_eguna',
        'igeileku_erreserba_ordua'
    ];
}
