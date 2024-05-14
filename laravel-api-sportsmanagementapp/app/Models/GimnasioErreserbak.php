<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GimnasioErreserbak extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'gela_id',
        'gym_erreserba_ordua',
        'gym_erreserba_eguna'
    ];

    protected $table = 'gimnasio_erreserbaks';

    // Definir la relación con Gela
    public function gela()
    {
        return $this->belongsTo(Gela::class, 'gela_id');
    }
}
