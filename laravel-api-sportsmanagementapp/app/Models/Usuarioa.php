<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarioa extends Model
{
    use HasFactory;

    protected $fillable = [
        'izena',
        'abizena',
        'gmail',
        'password',
        'type'
    ];
}
