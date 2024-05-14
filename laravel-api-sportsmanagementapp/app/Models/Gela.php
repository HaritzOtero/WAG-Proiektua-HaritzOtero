<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gela extends Model
{
    use HasFactory;

    protected $fillable = [
        'gela_izena',
        'pertsona_kopMax'
    ];

    protected $table = 'gelas';
}
